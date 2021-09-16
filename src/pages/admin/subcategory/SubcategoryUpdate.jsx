import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import * as subcategoryRequest from '../../../helpers/requests/subcategory';
import * as categoryRequest from '../../../helpers/requests/category';

import AdminSideBar from '../../../components/nav/AdminSideBar';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/form/CategoryForm';
import ParentCategorySelect from '../../../components/ParentCategorySelect';

function SubcategoryUpdate({ history, match }) {
	const [name, setName] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [categoryId, setCategoryId] = useState('');
	const user = useSelector((state) => state.user);
	const { slug } = match.params;

	useEffect(() => {
		loadCategory();
		loadSubcategory(slug);
		return () => console.log('Cleaning up SubcategoryUpdate useEffect ...');
		// eslint-disable-next-line
	}, []);

	const loadCategory = async () => {
		await categoryRequest
			.getAllCategories()
			.then((data) => setCategories(data))
			.catch((err) => toast.error(err));
	};

	const loadSubcategory = async (slug) => {
		await subcategoryRequest
			.getSubcategoryBySlug(slug)
			.then((sub) => {
				setName(sub.name);
				setCategoryId(sub.parent);
			})
			.catch((err) => {
				toast.error(err);
			});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (user && user.token && name && slug) {
			setLoading(true);
			await subcategoryRequest
				.updateSubcategory(user.token, slug, name, categoryId)
				.then((res) => {
					toast.success(`Subcategory has been updated`);
					history.push('/admin/subcategory/');
				})
				.catch((err) => {
					toast.error(JSON.stringify(err.message));
				})
				.finally(() => setLoading(false));
		}
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
						<h4>Update subcategory</h4>
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
				</div>
			</div>
		</div>
	);
}

export default SubcategoryUpdate;
