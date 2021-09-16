import React, { useState, useEffect } from 'react';
import * as productRequest from '../../helpers/requests/product';
import SingleProduct from './SingleProduct';
import LoadingCard from '../../components/card/LoadingCard';
import ProductCard from '../../components/card/ProductCard';
import { toast } from 'react-toastify';
import { Breadcrumb } from 'antd';
const {Item} = Breadcrumb;

function ProductView({ match }) {
	const { slug } = match.params;
	const [product, setProduct] = useState({});
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [star, setStar] = useState(0);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		loadSingleProduct(slug);
		loadRelatedProducts(slug);
	}, [slug]);

	const loadSingleProduct = async (slug) => {
		setLoading(true);
		await productRequest
			.getProduct(slug)
			.then((res) => {
				setProduct(res);
			})
			.catch((err) => {
				toast.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const loadRelatedProducts = async (slug) => {
		setLoading(true);
		await productRequest
			.getRelatedProducts(slug)
			.then((res) => {
				setRelatedProducts(res.products);
			})
			.catch((err) => {
				toast.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const showRelatedProducts = () => {
		if (isLoading) return <LoadingCard count={4} />;
		return relatedProducts.length ? (
			relatedProducts.map((product) => (
				<div className=' col-lg-3 col-md-6 pb-3' key={product._id}>
					<ProductCard product={product} />
				</div>
			))
		) : (
			<div className='col text-center'>No related product found.</div>
		);
	};

	return (
		<div className='container'>
			<div className='row py-4'>
				<Breadcrumb>
					<Item><a href='/'>Home</a></Item>
					<Item><a href='/shop'>Shop</a></Item>
					<Item><a href={`/product/${slug}`}>{product&&product.title }</a></Item>
				</Breadcrumb>
			</div>
			<div className='row pt-2'>
				{isLoading ? (
					<LoadingCard count={1} />
				) : (
					<SingleProduct
						product={product}
						star={star}
						setStar={setStar}
						loadSingleProduct={loadSingleProduct}
					/>
				)}
			</div>
			<div className='row'>
				<div className='col pt-5 pb-5 text-center'>
					<hr />
					<h4>Relative products</h4>
					<hr />
					<div className='container'>
						<div className='row'>{showRelatedProducts()}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductView;
