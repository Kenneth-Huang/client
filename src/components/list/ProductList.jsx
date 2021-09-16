import React from 'react';
import ankIcon from '../../image/ank.svg';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

function ProductList({ product: p }) {
	const { title, price, brand, color, shipping, images } = p.product;

	return (
		<tr>
			<td className='align-middle'>
				{
					<div className='mx-auto' style={{ width: '100px', height: 'auto' }}>
						<img
							src={images && images.length ? images[0].url : ankIcon}
							alt={title}
							style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
						/>
					</div>
				}
			</td>
			<td className='align-middle'>{title}</td>
			<td className='align-middle'>{price}</td>
			<td className='align-middle'>{brand}</td>
			<td className='align-middle'>{color}</td>
			<td className='text-center align-middle'>{p.count}</td>
			<td className='align-middle text-center'>
				{shipping === 'Yes' ? (
					<CheckCircleOutlined className='text-success ' />
				) : (
					<CloseCircleOutlined className='text-danger' />
				)}
			</td>
		</tr>
	);
}

export default ProductList;
