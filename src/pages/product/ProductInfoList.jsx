import React from 'react';
import { Link } from 'react-router-dom';

function ProductInfoList({ product }) {
	const {
		subcategory,
		category,
		brand,
		color,
		quantity,
		shipping,
		sold,
	} = product;

	return (
		<div>
			<ul className='list-group'>
				{category && (
					<li className='list-group-item'>
						Category:
						<Link
							to={`/category/${category.slug}`}
							className='label label-default label-pill pull-xs-right'
						>
							{category.name}
						</Link>
					</li>
				)}
				{subcategory && (
					<li className='list-group-item'>
						Subcategory:
						<span className='label label-default label-pill pull-xs-right'>
							{subcategory.map((s) => (
								<Link key={s._id} to={`/subcategory/${s.slug}`}>
									{s.name}
								</Link>
							))}
						</span>
					</li>
				)}

				<li className='list-group-item'>
					Shipping:
					<span className='label label-default label-pill pull-xs-right'>
						{shipping}
					</span>
				</li>
				<li className='list-group-item'>
					Colour:
					<span className='label label-default label-pill pull-xs-right'>
						{color}
					</span>
				</li>
				<li className='list-group-item'>
					Brand:
					<span className='label label-default label-pill pull-xs-right'>
						{brand}
					</span>
				</li>
				<li className='list-group-item'>
					Available:
					<span className='label label-default label-pill pull-xs-right'>
						{quantity}
					</span>
				</li>
				<li className='list-group-item'>
					Sold:
					<span className='label label-default label-pill pull-xs-right'>
						{sold}
					</span>
				</li>
			</ul>
		</div>
	);
}

export default ProductInfoList;
