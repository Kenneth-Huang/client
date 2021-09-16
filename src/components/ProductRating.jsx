import React from 'react';
import Rating from './Rating';

function ProductRating({ ratings, customStyle, isShowNum }) {
	let calStar =
		ratings && ratings.length > 0
			? ratings
					.map((r) => {
						return parseInt(r.star);
					})
					.reduce((acc, cur) => {
						return Math.floor((acc + cur) / ratings.length);
					}, 0)
			: 0;

	return (
		<div className={customStyle ? customStyle : 'text-center pt-1 pb-3'}>
			<Rating star={calStar} disabled={true} isShowNum={isShowNum} />
		</div>
	);
}

export default ProductRating;
