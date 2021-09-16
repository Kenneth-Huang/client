import React from 'react';
import { Rate } from 'antd';

const desc = [1, 2, 3, 4, 5];

function Rating({
	star,
	setStar,
	disabled,
	isShowNum,
	count,
	id,
}) {
	const handleChange = (value) => {
		setStar(value);
	};

	return (
		<span>
			<Rate
				tooltips={!disabled && desc}
				onChange={handleChange}
				disabled={disabled}
				count={count ? count : 5}
				value={star}
				style={{ color: '#FF4500' }}
				onHoverChange={(e) => {
					console.log('e.target', e);
				}}
			/>
			{isShowNum && star ? (
				<span className='ant-rate-text'>{desc[star - 1]}</span>
			) : (
				''
			)}
		</span>
	);
}

export default Rating;
