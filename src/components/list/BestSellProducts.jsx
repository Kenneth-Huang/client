import React from 'react';
import ProductCardList from '../../components/list/ProductCardList'

function BestSellProducts() {
	return (
		<div className='container py-3'>
			<h2 className=' text-center p3 mt-5 mb-5 display-5'>Best sellers</h2>
			<ProductCardList sort={{ sold: -1 }} countPerpage={4} />
		</div>
	)
}

export default BestSellProducts
