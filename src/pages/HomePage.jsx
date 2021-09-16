import React from 'react';

import BestSellProducts from '../components/list/BestSellProducts';
import HomePageSlider from '../components/HomePageSlider';
import NewArrivalProducts from '../components/list/NewArrivalProducts'


function HomePage() {
	return (
		<>
			<HomePageSlider />
			<NewArrivalProducts />
			<BestSellProducts />
		</>
	);
}

export default HomePage;
