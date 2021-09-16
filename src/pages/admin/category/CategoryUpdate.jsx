import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AdminSideBar from '../../../components/nav/AdminSideBar';
import * as categoryRequest from '../../../helpers/requests/category';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/form/CategoryForm';

function CategoryUpdate({ history, match }) {
	const [name, setName] = useState('');
	const [isLoading, setLoading] = useState(false);
	const user = useSelector((state) => state.user);
	const { slug } = match.params;

	useEffect(() => {
		loadCategory(slug);
		return () => console.log('Cleaning up CategoryUpdate useEffect ...');
		// eslint-disable-next-line
	}, []);

	const loadCategory = async (slug) => {
		await categoryRequest
			.getCategory(slug)
			.then((category) => setName(category.name))
			.catch((err) => {
				toast.error(err);
			});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (user && user.token && name && slug) {
			setLoading(true);
			await categoryRequest
				.updateCategory(user.token, slug, name)
				.then((res) => {
					toast.success(`Category has been updated`);
					history.push('/admin/category/');
				})
				.catch((err) => {
					toast.error(JSON.stringify(err.message));
				})
				.finally(() => setLoading(false));
		}
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
						<h4>Update category</h4>
					)}
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

export default CategoryUpdate;
