import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartConstants, drawerConstants } from '../../redux/constants';
import _ from 'lodash';
import { Tooltip } from 'antd';

const BtnAddToCart = ({ product }) => {
	const { cart } = useSelector((state) => state);
	const dispatch = useDispatch();

	const handleAddToCart = async () => {
		let cart = [];
		let uniqueCart = [];
		if (typeof window !== undefined) {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.push({ ...product, count: 1 });
			uniqueCart = _.uniqBy(cart, '_id');
		}
		// setToolTip('Product was added');
		dispatch({ type: cartConstants.ADD_TO_CART, payload: uniqueCart });
		//Show CartDrawer
		dispatch({
			type: drawerConstants.SET_CARTDRAWER_VISIBLE,
			payload: true,
		});
		// }
	};

	return product.quantity > 0 ? (
		<Tooltip
			title={
				cart.find((p) => p._id === product._id)
					? 'Product was already added'
					: 'Click to add to cart'
			}
		>
			<div
				onClick={handleAddToCart}
				className='btn btn-primary btn-block font-weight-normal mb-1'
			>
				<i className='fas fa-cart-plus'> Add to cart</i>
			</div>
		</Tooltip>
	) : (
		<Tooltip title='Out of stock'>
			<div className='text-danger btn btn-info btn-block font-weight-normal mb-1'>
				<i className='fas fa-cart-plus'> Out of Stock</i>
			</div>
		</Tooltip>
	);
};

export default BtnAddToCart;
