import React from 'react';
import Rating from '../Rating';

function StarFilter({ setStar, triggerFilter, star }) {
	let starArray = [5, 4, 3, 2, 1];
	const handleStarClick = (s) => {
		setStar(s);
		triggerFilter();
	};
	const onClear = () => {
		setStar(0);
		triggerFilter();
	};
	return (
		<div className='container mb-2'>
			{starArray.map((s) => {
				return (
					<div
						key={s}
						className={`my-2 mx-4 ${star === s ? 'bg-info' : ''}`}
						onClick={() => handleStarClick(s)}
					>
						<Rating star={s} count={s} disabled={true} />
					</div>
				);
			})}
			{star ? (
				<div className='btn btn-primary btn-block' onClick={onClear}>
					Clear
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default StarFilter;
