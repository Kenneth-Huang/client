import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminSideBar from '../../../components/nav/AdminSideBar';
import * as categoryRequest from '../../../helpers/requests/category';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/form/CategoryForm';
import LocalSearch from '../../../components/form/LocalSearch';

function CategoryCreate({ history }) {
	const [name, setName] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [keywords, setKeywords] = useState('');
	const user = useSelector((state) => state.user);

	useEffect(() => {
		loadCategory();
	}, []);

	const loadCategory = async () => {
		await categoryRequest
			.getAllCategories()
			.then((data) => setCategories(data))
			.catch((err) => toast.error(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (user && user.token && name) {
			setLoading(true);
			await categoryRequest
				.createCategory(user.token, name)
				.then((res) => {
					toast.success(
						`Category "${res.name.toUpperCase()}" has been created`
					);
					setName('');
					loadCategory();
				})
				.catch((err) => {
					toast.error(JSON.stringify(err.message));
				})
				.finally(() => setLoading(false));
		}
	};

	const handleRemove = async (slug) => {
		if (window.confirm('Are you sure want to delete?')) {
			setLoading(true);
			await categoryRequest
				.deleteCategory(user.token, slug)
				.then((res) => {
					toast.success(res);
					loadCategory();
				})
				.catch((err) => {
					if (err.message) toast.error(JSON.stringify(err.message));
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const filterConditon = (keywords) => {
		if (keywords.length > 2)
			return (category) => category.name.toLowerCase().includes(keywords);
		return () => true;
	};

	return (
		<div className='container-fluid mt-3'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminSideBar />
				</div>
				<div className='col'>
					{isLoading ? (
						<h4 className='text-danger'>Loading...</h4>
					) : (
						<h4>Create category</h4>
					)}
					<CategoryForm
						name={name}
						setName={setName}
						handleSubmit={handleSubmit}
					/>
					<LocalSearch keywords={keywords} setKeywords={setKeywords} />
					{categories.length > 0
						? categories.filter(filterConditon(keywords)).map((category) => (
								<div className='alert alert-secondary d-flex justify-content-between align-items-center' key={category._id}>
									<p className='h5'>{category.name}</p>
									<div>
										<span
											onClick={() => handleRemove(category.slug)}
											className='btn btn-sm float-right'
										>
											<DeleteOutlined className='text-danger' />
										</span>
										<Link to={`/admin/category/${category.slug}`}>
											<span className='btn btn-sm float-right'>
												<EditOutlined className='text-info' />
											</span>
										</Link>
									</div>
								</div>
						  ))
						: 'No category yet'}
				</div>
			</div>
		</div>
	);
}

export default CategoryCreate;
