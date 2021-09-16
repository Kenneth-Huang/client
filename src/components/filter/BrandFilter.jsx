import React from 'react';
import { Radio } from 'antd';
const { Group } = Radio;

function BrandFilter({ productBrands, brand, setBrand, triggerFilter }) {
	const onBrandChange = (e) => {
		setBrand(e.target.value);
		triggerFilter();
	};
	return (
		<Group onChange={onBrandChange} value={brand}>
			<div className='container mb-2'>
				<div className='row my-1'>
					{productBrands.map((b) => (
						<div className='col-md-4 my-1' key={b}>
							<Radio value={b} name={b}>
								{b}
							</Radio>
						</div>
					))}
				</div>
				{brand ? (
					<div
						className='btn btn-primary btn-block'
						onClick={() => {
							setBrand('');
							triggerFilter();
						}}
					>
						clear
					</div>
				) : (
					''
				)}
			</div>
		</Group>
	);
}

export default BrandFilter;
