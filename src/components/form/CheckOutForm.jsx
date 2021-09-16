import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartConstants } from '../../redux/constants';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../../helpers/requests/payment';
import { createOrder } from '../../helpers/requests/order';
import { emptyUserCart } from '../../helpers/requests/cart';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import payment from '../../image/payment.svg';
import { toast } from 'react-toastify';

function CheckOutForm() {
	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState('');

	const [cartTotal, setCartTotal] = useState(0);
	const [payAmount, setPayAmount] = useState(0);

	const stripe = useStripe();
	const elements = useElements();

	const { user } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user)
			createPaymentIntent(user.token)
				.then((res) => {
					setClientSecret(res.clientSecret);
					setCartTotal(res.cartTotal);
					setPayAmount(res.amount);
				})
				.catch((err) => {
					console.error(err.message);
				});
		// eslint-disable-next-line
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: user.email, //this is the client name showing in stripe dashboard
				},
			},
		});
		if (payload.error) {
			setError(`Payment failure: ${payload.error.message}`);
		} else {
			setError(null);
			setProcessing(false);
			setSucceeded(true);
			if (user && user.token)
				await createOrder(user.token, payload.paymentIntent)
					.then(async (res) => {
						//clear cart state in redux store & localStorage
						dispatch({ type: cartConstants.EMPTY_CART });
						//clear cart record in DB
						await emptyUserCart(user.token)
							.then((res) => {
								if (res.status === 200)
									console.log('Remove cart from database successfully');
							})
							.catch((err) => {
								throw new Error('Remove cart from database faild');
							});
						toast.success(res.message);
					})
					.catch((err) => toast.error(err.message));
		}
	};

	const handleChange = (e) => {
		setError(e.error ? e.error.message : '');
		setDisabled(e.empty);
	};

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-4'>
					<div className='pt-2 text-center'>
						<Card
							style={{ width: 250, margin: '0 auto' }}
							cover={
								<img
									alt='logo'
									src={payment}
									className='cover-fit'
									style={{ width: '80%', margin: '0 auto' }}
								/>
							}
							actions={[
								<>
									<DollarOutlined key='dollar' className='text-info' />
									<br />
									<span className='text-info font-weight-bold'>
										Total: <br /> ${cartTotal}
									</span>
								</>,
								<>
									<CheckOutlined key='check' className='text-success' />
									<span className='text-success font-weight-bold'>
										Payment: <br />${payAmount}
									</span>
								</>,
							]}
						>
							<Card.Meta
								title='Card title'
								description={
									<span className='text-danger font-weight-bold'>
										{cartTotal === payAmount
											? 'No coupon applied.'
											: `You have save
										$${cartTotal - payAmount}`}
									</span>
								}
							/>
						</Card>
					</div>
				</div>
				<div className='col-md-8 align-self-end'>
					<p>Card#: 4242 4242 4242 4242</p>

					{succeeded && (
						<div className='text-success font-weight-bold mb-4 mt-4'>
							Payment successfully.{' '}
							<Link to='/user/order-history'>
								Check it in your history order.
							</Link>
						</div>
					)}
					<form onSubmit={handleSubmit} id='payment-form' className='mb-5'>
						<div className='container card-container border border-light rounded'>
							<CardElement
								onChange={handleChange}
								id='card-element'
								hidePostalCode={true}
							/>
							<button
								id='submit'
								type='submit'
								className={`stripe-btn btn-light'${
									processing
										? ' button--loading'
										: disabled
										? ' text-secondary'
										: ''
								}`}
								disabled={processing || disabled || succeeded || error}
							>
								{processing ? 'Loading' : 'Pay'}
							</button>

							{error && (
								<div className='text-danger font-weight-bold mt-2' role='alert'>
									{error}
								</div>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CheckOutForm;
