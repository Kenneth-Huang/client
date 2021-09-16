import React from 'react';
import ProductCardList from '../../components/list/ProductCardList';
import { CARD_LIST_DISPLAY_TYPE } from '../../constants';

const NewArrivalProducts = () => {
	return (
			<div className='bg-white py-3 border-top border-bottom container'>
				<h2 className=' text-center p3 mt-5 mb-5 display-5'>New Arrivals</h2>
				<ProductCardList
					sort={{ createdAt: -1 }}
					countPerpage={10}
					displayType={CARD_LIST_DISPLAY_TYPE.CAROUSEL}
				/>
			</div>
	)
}

export default NewArrivalProducts;
