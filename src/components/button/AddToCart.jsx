import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartConstants, drawerConstants } from '../../redux/constants';

import { ShoppingCartOutlined, StrikethroughOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { Tooltip } from 'antd';

function AddToCart({ product }) {
	// const [toolTip, setToolTip] = useState('Click to add to cart');
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
			<span
				onClick={handleAddToCart}
				className='btn btn-sm font-weight-normal text-success'
			>
				<ShoppingCartOutlined />
				<br />
				Add To Cart
			</span>
		</Tooltip>
	) : (
		<Tooltip title='Out of stock'>
			<span className='text-danger btn btn-sm font-weight-normal'>
				<StrikethroughOutlined />
				<br />
				Out of Stock
			</span>
		</Tooltip>
	);
}

export default AddToCart;
