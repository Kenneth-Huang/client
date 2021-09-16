import React, { useState, useEffect } from 'react';
import * as productRequest from '../../helpers/requests/product';
import ProductCard from '../card/ProductCard';
import LoadingCard from '../card/LoadingCard';
import { toast } from 'react-toastify';
import { Pagination } from 'antd';
import { CARD_LIST_DISPLAY_TYPE } from '../../constants';
import CardSwiper from '../card/CardSwiper';

function ProductCardList({
	sort,
	countPerpage,
	displayType = CARD_LIST_DISPLAY_TYPE.DEFAULT,
}) {
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [productCount, setProductCount] = useState(0);

	const loadProducts = async (sort, countPerpage, currentPage) => {
		setLoading(true);
		await productRequest
			.getProductsByConditions(sort, countPerpage, currentPage)
			.then((data) => {
				setProducts(data);
			})
			.catch((err) => {
				toast.error('Error in get data:', err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const loadProductsCount = async () => {
		setLoading(true);
		return await productRequest
			.getProductsCount()
			.then((count) => setProductCount(count))
			.catch((err) => {
				toast.error('Error in get product count:', err.message);
			})
			.finally(setLoading(false));
	};

	useEffect(() => {
		loadProductsCount();
	}, []);

	useEffect(() => {
		loadProducts(sort, countPerpage, currentPage);
	}, [sort, currentPage, countPerpage]);

	const showProductCardsColumn = (products) => {
		if (isLoading) return <LoadingCard count={countPerpage} />;
		return products.map((product) => (
			<div className=' col-lg-3 col-md-6 pb-3 d-flex' key={product._id}>
				<ProductCard product={product} />
			</div>
		));
	};

	const showCardSwiper = (products) => {
		if (isLoading)
			return <LoadingCard count={countPerpage} />;
		return <CardSwiper products={products}/>
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return displayType === CARD_LIST_DISPLAY_TYPE.DEFAULT ? (
		<>
			<div className='container px-4 py-3'>
				<div className='row'>{showProductCardsColumn(products)}</div>
				<div className='row'>
					<div className='col-md-4 offset-md-4 text-center pt-2 p-3'>
						<Pagination
							defaultCurrent={1}
							current={currentPage}
							defaultPageSize={countPerpage}
							total={productCount}
							onChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</>
	) : (
		<div className='container px-4 py-3'>
			<div className='row'>{showCardSwiper(products)}</div>
		</div>
	);
}

export default ProductCardList;
