import React from 'react';
import ProductCard from '../card/ProductCard';
import LoadingCard from '../card/LoadingCard';
import { Pagination } from 'antd';

function FilteredCardList({
	products,
	isLoading,
	currentPage,
	countPerpage,
	productCount,
	handlePageChange,
}) {
	const showProducts = (products) => {
		if (isLoading) return <LoadingCard count={4} />;
		return products.length ? (
			products.map((product) => (
				<div className=' col-lg-3 col-md-6 pb-3' key={product._id}>
					<ProductCard product={product} />
				</div>
			))
		) : (
			<div className='col text-center'>'No product found yet'</div>
		);
	};
	return (
		<div className='container px-4 py-3'>
			<div className='row'>{showProducts(products)}</div>
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
	);
}

export default FilteredCardList;
