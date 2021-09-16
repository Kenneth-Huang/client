import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as categoryRequest from '../../../helpers/requests/category';
import * as subcategoryRequest from '../../../helpers/requests/subcategory';
import AdminSideBar from '../../../components/nav/AdminSideBar';
import CategoryForm from '../../../components/form/CategoryForm';
import LocalSearch from '../../../components/form/LocalSearch';
import ParentCategorySelect from '../../../components/ParentCategorySelect';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { toast } from 'react-toastify';

function SubcategoryCreate() {
	const [name, setName] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [subcategories, setSubcategories] = useState([]);
	const [categories, setCategories] = useState([]);
	const [categoryId, setCategoryId] = useState('');
	const [keywords, setKeywords] = useState('');

	const user = useSelector((state) => state.user);

	useEffect(() => {
		loadCategory();
		loadSubcategories();
	}, []);

	const loadCategory = async () => {
		await categoryRequest
			.getAllCategories()
			.then((data) => setCategories(data))
			.catch((err) => toast.error(err));
	};

	const loadSubcategories = async () => {
		await subcategoryRequest
			.getAllSubcategories()
			.then((data) => setSubcategories(data))
			.catch((err) => toast.error(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!categoryId) {
			alert('please select parent category');
			setName('');
			setLoading(false);
			return;
		}
		if (user && user.token && name) {
			setLoading(true);
			await subcategoryRequest
				.createSubcategory(user.token, name, categoryId)
				.then((res) => {
					toast.success(
						`Category "${res.name.toUpperCase()}" has been created`
					);
					setName('');
					loadSubcategories();
				})
				.catch((err) => {
					toast.error(JSON.stringify(err.message));
				})
				.finally(() => {
					setLoading(false);
					setName('');
					setCategoryId('');
				});
		}
	};

	const handleRemove = async (slug) => {
		if (window.confirm('Are you sure want to delete?')) {
			setLoading(true);
			await subcategoryRequest
				.deleteSubcategory(user.token, slug)
				.then((res) => {
					toast.success(res);
					loadSubcategories();
				})
				.catch((err) => {
					if (err.message) toast.error(JSON.stringify(err.message));
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const filterByKeyword = (keywords) => {
		if (keywords.length > 2)
			return (category) => category.name.toLowerCase().includes(keywords);
		return () => true;
	};

	const filterByCategory = (categoryId) => {
		if (categoryId)
			return (subcategory) => {
				return subcategory.parent === categoryId;
			};
		return () => true;
	};

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminSideBar />
				</div>
				<div className='col'>
					{isLoading ? (
						<h4 className='text-danger'>Loading...</h4>
					) : (
						<h4>Create subcategory</h4>
					)}
					<ParentCategorySelect
						categories={categories}
						categoryId={categoryId}
						setCategoryId={setCategoryId}
					/>
					<CategoryForm
						name={name}
						setName={setName}
						handleSubmit={handleSubmit}
					/>
					<LocalSearch keywords={keywords} setKeywords={setKeywords} />
					{subcategories
						.filter(filterByKeyword(keywords))
						.filter(filterByCategory(categoryId))
						.map((subcategory) => (
							<div className='alert alert-secondary d-flex justify-content-between align-items-center' key={subcategory._id}>
								<p className='h5'>{subcategory.name}</p>
								<div>
									<span
										onClick={() => handleRemove(subcategory.slug)}
										className='btn btn-sm float-right'
									>
										<DeleteOutlined className='text-danger' />
									</span>
									<Link to={`/admin/subcategory/${subcategory.slug}`}>
										<span className='btn btn-sm float-right'>
											<EditOutlined className='text-info' />
										</span>
									</Link>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default SubcategoryCreate;
