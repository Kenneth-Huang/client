import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getUserCart,
	emptyUserCart,
	saveUserAddress,
	applyCoupon as applyCouponRequest,
} from '../helpers/requests/cart';
import { cartConstants, userConstants } from '../redux/constants';
import { toast } from 'react-toastify';
import { ADDRESS_STATES } from '../constants';
import { Popover } from 'antd';
import { CreditCardOutlined, DollarOutlined } from '@ant-design/icons';
import { createOCDPaymentIntent } from '../helpers/requests/payment';
import { createOrder } from '../helpers/requests/order';

function Checkout({ history }) {
	const [products, setProducts] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);
	const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
	const [discountError, setDiscountError] = useState('');
	//address information
	const [address, setAddress] = useState({
		street: '',
		sub: '',
		city: '',
		state: '',
		code: '',
	});
	const [isAddressSaved, setAddressSaved] = useState(false);
	//coupons
	const [coupon, setCoupon] = useState('');

	const { user } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			if (user.address) {
				setAddress(user.address);
				setAddressSaved(true);
			}
			getUserCart(user.token)
				.then((res) => {
					setProducts(res.products);
					setTotalAfterDiscount(res.cartTotalAfterDiscount);
					setCartTotal(res.cartTotal);
				})
				.catch((err) => console.error(err.message));
		}
	}, [user]);

	const emptyCart = async () => {
		if (user)
			await emptyUserCart(user.token)
				.then((res) => {
					if (res.status === 200) {
						setProducts([]);
						setCartTotal(0);
						setTotalAfterDiscount(0);
						if (typeof window !== undefined) {
							dispatch({ type: cartConstants.EMPTY_CART });
							// dispatch({ type: couponConstants.APPLY_COUPON, payload: false });
							toast.success('empty cart successfully');
						}
					}
				})
				.catch((err) => {
					toast.error(' error: ' + err.message);
				});
	};

	const saveAddressToDB = async () => {
		setAddressSaved(false);
		let addressFormValidated = null;
		addressFormValidated = Object.values(address).find((v) => v === '');
		if (addressFormValidated === undefined) {
			if (user)
				await saveUserAddress(user.token, address)
					.then((res) => {
						if (res.status === 200) {
							toast.success('address updated successfully');
							dispatch({ type: userConstants.UPDATE_USER, payload: address });
							setAddressSaved(true);
						}
					})
					.catch((err) => toast.error(err.message));
		} else {
			toast.error('address not all filled');
			console.log('address not all filled');
		}
	};

	const onAddressChange = (e) => {
		setAddressSaved(false);
		setAddress({ ...address, [e.target.name]: e.target.value });
	};

	const showCouponForm = () => {
		return (
			<>
			<div className='row'>
				<div className='col-md-11 offset-md-1'>
						<div className='form-group form-inline'>
							<label htmlFor='coupon'>
								Coupon Code:
							</label>
							<input
								type='text'
								className='form-control w-75'
								placeholder='Ex: "IPHONESCREEN"'
								id='coupon'
								value={coupon}
								onChange={(e) => {
									setCoupon(e.target.value.toUpperCase());
									setDiscountError('');
								}}
							/>
							
						</div>
						
				</div>
			</div>
			<div className='row'>
				<div className='col-md-6 offset-md-6'>
					<button
						className='btn btn-outline-primary float-right'
						disabled={coupon===''}
						onClick={applyCoupon}
					>
						Apply
					</button>
				</div>
			</div>
			</>
		);
	};

	const applyCoupon = async () => {
		if (user)
			await applyCouponRequest(user.token, coupon)
				.then(({ cartTotalAfterDiscount }) => {
					setTotalAfterDiscount(cartTotalAfterDiscount);
				})
				.catch((err) => {
					toast.error('Error: ' + err.message);
					setDiscountError(err.message);
				})
				.finally(() => {
					setCoupon('');
				});
	};

	const handleCashPlaceOrder = async () => {
		if (user && user.token) {
			await createOCDPaymentIntent(user.token).then(async (paymentIntent) => {
				await createOrder(user.token, paymentIntent)
					.then(async (res) => {
						//clear cart state in redux store & localStorage
						dispatch({ type: cartConstants.EMPTY_CART });
						//clear cart record in DB
						await emptyUserCart(user.token)
							.then((res) => {
								if (res.status === 200) {
									console.log('Remove cart from database successfully');
								}
							})
							.catch((err) => {
								throw new Error('Remove cart from database faild');
							});
						toast.success(res.message);
					})
					.catch((err) => toast.error(err.message));
			});
		}
		return history.push('/user/order-history');
	};

	//Checkout Methods:
	const checkoutMethodBtns = (
		<div className='my-1'>
			<p>
				<span
					className='btn btn-raised btn-primary m-2 font-weight-bold'
					disabled={products.length === 0 || !isAddressSaved}
					onClick={() => history.push('/payment')}
				>
					<CreditCardOutlined /> Card
				</span>
			</p>
			<p>
				<span
					className='btn btn-raised btn-info m-2 font-weight-bold'
					disabled={products.length === 0 || !isAddressSaved}
					onClick={() => handleCashPlaceOrder()}
				>
					<DollarOutlined /> Cash on delivery
				</span>
			</p>
		</div>
	);

	return (
		<div className='container mt-4'>
			<div className='row'>
				<div className='col-md-6'>
					<h4>Delivery Address</h4>
					<div className='row'>
						<div className='col-md-10 offset-md-1'>
							<form onSubmit={onAddressChange}>
								<div className='form-row'>
									<div className='form-group col-md-6'>
										<label htmlFor='street-address'>
											Street Address:
										</label>
										<input
											type='text'
											className='form-control'
											id='street-address'
											name='street'
											required
											value={address.street}
											onChange={onAddressChange}
											placeholder='EX: 1 Sunny Road'
										></input>
									</div>
									<div className='form-group col-md-6'>
										<label htmlFor='sub'>
											Suburb:
										</label>
										<input
											type='text'
											className='form-control'
											id='sub'
											name='sub'
											required
											value={address.sub}
											onChange={onAddressChange}
											placeholder='EX: Sunnybank'
										></input>
									</div>
								</div>
								<div className='form-row'>
									<div className='form-group col-md-6'>
									  <label for='inputCity'>City:</label>
									  <input
											type='text'
											className='form-control'
											id='inputCity'
											name='city'
											required
											value={address.city}
											onChange={onAddressChange}
											placeholder='EX: Brisbane'
										></input>
									</div>
									<div className='form-group col-md-4'>
										<label htmlFor='inputState'>
											State:
										</label>
										<select
											className='form-control'
											name='state'
											id='inputState'
											value={address.state}
											onChange={onAddressChange}
										>
											<option value=''>Choose...</option>
											{Object.values(ADDRESS_STATES).map((state, index) => (
												<option value={state} key={state + index}>
													{state}
												</option>
											))}
										</select>
									</div>
									<div className='form-group col-md-2'>
										<label htmlFor='inputPostCode'>
											Post Code:
										</label>
										<input
											type='text'
											className='form-control'
											id='inputPostCode'
											name='code'
											required
											value={address.code}
											onChange={onAddressChange}
										></input>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6 offset-md-6'>
							<button
								className='btn btn-outline-primary m-2 font-weight-bold float-right'
								onClick={saveAddressToDB}
								disabled={isAddressSaved}
							>
								Save
							</button>
						</div>
					</div>

					<hr />
					<h4>Go a Coupon?</h4>
					{showCouponForm()}
					{discountError && <p className='alert-danger'>{discountError}</p>}
				</div>
				<div className='col-md-6'>
					<h4>Order summary</h4>
					<hr />
					<p>{`Product${products.length > 1 ? 's' : ''} *${
						products.length
					}`}</p>
					<hr />
					{products.length > 0
						? products.map((p) => (
								<div key={p._id} className=''>
									{p.product.title} ({p.color})* {p.count} = $
									{p.price * p.count}
								</div>
						  ))
						: null}
					<hr />
					<p>Cart Total: ${cartTotal}</p>

					{totalAfterDiscount > 0 ? (
						<p className='alert-info font-weight-bold p-2'>
							Discount applied, total: ${totalAfterDiscount}
						</p>
					) : (
						''
					)}
					<br />
					<div className='row'>
						<div className='col-md-6'>
							<Popover
								placement='right'
								title={'Payment Method'}
								content={checkoutMethodBtns}
								trigger='click'
							>
								<span
									className='btn btn-outline-primary m-2 font-weight-bold'
									disabled={products.length === 0 || !isAddressSaved}
								>
									Place Order
								</span>
							</Popover>
						</div>
						<div className='col-md-6'>
							<button
								disabled={products.length === 0}
								className='btn btn-outline-primary m-2 font-weight-bold'
								onClick={emptyCart}
							>
								Empty Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
