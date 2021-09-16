import React from 'react';
import { Skeleton } from 'antd';

function LoadingCard({ count }) {
	const cards = new Array(count);
	return Array.from(cards, (card, index) => (
		<div className='col-lg-3 col-md-6 pb-3' key={index}>
			<Skeleton active button></Skeleton>
		</div>
	));
}

export default LoadingCard;
