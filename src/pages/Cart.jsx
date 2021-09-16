import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCartPage from '../components/card/ProductCardInCartPage';
import { saveUserCart } from '../helpers/requests/cart';
import { Breadcrumb } from 'antd';
const { Item } = Breadcrumb;

function Cart({ history }) {
	const { user, cart } = useSelector((state) => state);
	const getTotalPrice = () => {
		if (cart.length)
			return cart.reduce((acc, cur) => acc + cur.price * cur.count, 0);
		return 0;
	};

	const processCheckout = () => {
		//save cart to backend
		if (user && user.token && cart) {
			saveUserCart(user.token, cart) //save cart information from local redux store to server
				.then((res) => {
					if (res.status === 200) history.push('/checkout');
				})
				.catch((err) => console.error(err.message));
		}
	};

	const showProductsInCart = (cart) => {
		return (
			<table className='table table-bordered'>
				<thead className='thead-light'>
					<tr>
						<th>Image</th>
						<th>Titel</th>
						<th>Price</th>
						<th>Brand</th>
						<th>Color</th>
						<th>Count</th>
						<th>Shipping</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{cart.map((p) => (
						<ProductCardInCartPage key={p._id} product={p} />
					))}
				</tbody>
			</table>
		);
	};

	return (
		<div className='container'>
			<div className='row py-4'>
				<Breadcrumb>
					<Item><Link to='/'>Home</Link></Item>
					<Item><Link to='/cart'>Cart</Link></Item>
				</Breadcrumb>
			</div>
			<div className='row'>
				<div className='col-md-8'>
					<h5 className='pb-3'>Review item:<span className='h6'>{cart.length ? `${cart.length} item${cart.length>1?'s':''}` : ''}</span></h5>
					{cart.length ? (
						showProductsInCart(cart)
					) : (
						<p>
							No products in the cart, please continue{' '}
							<Link to='/shop/'>shopping</Link>{' '}
						</p>
					)}
				</div>
				<div className='col-md-4'>
					<h4>Order summary</h4>
					<hr />
					<p>Products</p>
					{cart.length
						? cart.map((p) => (
								<p key={p._id}>
									{p.title} * {p.count} = ${p.price * p.count}
								</p>
						  ))
						: ''}
					<hr />
					Total: <b>${getTotalPrice()}</b>
					<hr />
					{user ? (
						<button
							onClick={processCheckout}
							type='button'
							className='btn btn-primary btn-block btn-sm mt-2'
							disabled={!cart.length}
						>
							Process to checkout
						</button>
					) : (
						<Link to={{ pathname: '/login', state: { from: '/cart' } }}>
							<span className='btn btn-primary btn-block btn-sm mt-2 text-white'
							>
								Login to checkout
							</span>
						</Link>

					)}
				</div>
			</div>
		</div>
	);
}

export default Cart;
