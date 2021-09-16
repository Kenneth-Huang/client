import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminSideBar from '../../../components/nav/AdminSideBar';
import * as productRequest from '../../../helpers/requests/product';
import AdminProductCard from '../../../components/card/AdminProductCard';
import { toast } from 'react-toastify';

function ProductsDisplay({ history }) {
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const { user } = useSelector((state) => state);

	const loadProducts = async (count) => {
		setLoading(true);
		await productRequest
			.getProductsByCount(count)
			.then((data) => {
				setProducts(data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		loadProducts(100);
	}, []);

	const handleProductDelete = (slug) => {
		const confirmation = window.confirm(
			'Are you sure want to delete this product?'
		);
		if (confirmation) {
			if (user && user.token)
				productRequest
					.deleteProduct(user.token, slug)
					.then((res) => {
						toast.success('Delete successfully:', res);
						const newProducts = products.filter((product) => {
							return product.slug !== slug;
						});
						setProducts(newProducts);
					})
					.catch((err) => {
						toast.error('Error deleting product:' + err.message);
					});
		}
	};

	return (
		<div className='container-fluid mt-3'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminSideBar />
				</div>
				<div className='col-md-10'>
					{isLoading ? (
						<h4 className='text-danger'>Loading...</h4>
					) : (
						<h4>All products</h4>
					)}
					<div className='row'>
						{products.map((product) => (
							<div className='col-lg-3 col-md-6 pb-3' key={product._id}>
								<AdminProductCard
									isLoading={isLoading}
									product={product}
									handleProductDelete={() => handleProductDelete(product.slug)}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductsDisplay;
