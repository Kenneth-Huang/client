import React from 'react';
import { useDispatch } from 'react-redux';
import { cartConstants } from '../../redux/constants';

import ankIcon from '../../image/ank.svg';
import ModalImage from 'react-modal-image';
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	CloseOutlined,
} from '@ant-design/icons';
import { PRODUCT_COLORS } from '../../constants';
const initColors = (COLORS) => {
	let colors = [];
	for (const key in COLORS) {
		colors[colors.length] = COLORS[key];
	}
	return colors;
};

function ProductCardInCartPage({ product: p }) {
	const productColors = initColors(PRODUCT_COLORS);
	const dispatch = useDispatch();

	const handleColorChange = (e) => {
		dispatch({
			type: cartConstants.CHANGE_COLOR,
			payload: { _id: p._id, color: e.target.value },
		});
	};

	const handleCountChange = (e) => {
		dispatch({
			type: cartConstants.CHANGE_COUNT,
			payload: { _id: p._id, count: e.target.value },
		});
	};

	////////////////////////////////
	//An alternative approach
	////////////////////////////////
	// const handleCountChanges = (e) => {
	// 	let cart = [];
	// 	if (typeof window !== undefined) {
	// 		if (localStorage.getItem('cart')) {
	// 			cart = JSON.parse(localStorage.getItem('cart'));
	// 		}
	// 		cart.forEach((product, index) => {
	// 			if (p._id === product._id) cart[index].count = e.target.value;
	// 		});
	// 		localStorage.setItem('cart', JSON.stringify(cart));
	// 		dispatch({
	// 			type: cartConstants.ADD_TO_CART,
	// 			payload: cart,
	// 		});
	// 	}
	// };

	const handleRemove = () => {
		if (window.confirm('Are you sure want to delete?'))
			dispatch({
				type: cartConstants.REMOVE_ITEM,
				payload: { _id: p._id },
			});
	};

	const showColor = () => {
		return (
			<select
				name='color'
				className='form-control'
				onChange={handleColorChange}
			>
				{p.color ? (
					<option value={p.color}>{p.color}</option>
				) : (
					<option>'Please select a color'</option>
				)}
				{productColors
					.filter((c) => c !== p.color)
					.map((c, index) => (
						<option key={c + index} value={c}>
							{c}
						</option>
					))}
			</select>
		);
	};
	return (
		<tr>
			<td className='align-middle'>
				{
					<div className='mx-auto' style={{ width: '100px', height: 'auto' }}>
						<ModalImage
							small={p.images && p.images.length ? p.images[0].url : ankIcon}
							large={p.images && p.images.length ? p.images[0].url : ankIcon}
							alt={p.title}
						/>
					</div>
				}
			</td>
			<td className='align-middle'>{p.title}</td>
			<td className='align-middle'>{p.price}</td>
			<td className='align-middle'>{p.brand}</td>
			<td className='align-middle'>{showColor()}</td>
			<td className='text-center align-middle'>
				<input
					className='form-control'
					min={1}
					type='number'
					value={p.count}
					onChange={handleCountChange}
				/>
			</td>
			<td className='align-middle text-center'>
				{p.shipping === 'Yes' ? (
					<CheckCircleOutlined className='text-success ' />
				) : (
					<CloseCircleOutlined className='text-danger' />
				)}
			</td>
			<td className='align-middle text-center'>
				<CloseOutlined className='text-danger' onClick={handleRemove} />
			</td>
		</tr>
	);
}

export default ProductCardInCartPage;
