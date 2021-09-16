import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, googleAuthProvider } from '../../helpers/firebase';
import { userConstants, cartConstants } from '../../redux/constants';
import * as requests from '../../helpers/requests/auth';
import { getUserCart } from '../../helpers/requests/cart';
import { Link } from 'react-router-dom';
import routeGuider from '../../route/routeGuider';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

const Login = ({ history }) => {
	const [email, setEmail] = useState(''); //kenneth.p.huang@gmail.com
	const [password, setPassword] = useState(''); //dordor
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state);

	useEffect(() => {
		if (user && user.token) {
			redirect(user);
		}
		// eslint-disable-next-line
	}, [user, history]);

	const handleChange = (e) => {
		e.target.name === 'email'
			? setEmail(e.target.value)
			: setPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const results = await auth.signInWithEmailAndPassword(email, password);
			if (results.user.emailVerified) {
				const { token } = await results.user.getIdTokenResult();
				requests
					.authenticate(token)
					.then((res) => {
						loginPostProcess(token, res);
					})
					.catch((err) => {
						toast.error(
							'failed to authenticate with firebase! Error:' + err.message
						);
					});
			}
		} catch (e) {
			setLoading(false);
			toast.error('login failed: ' + e.message);
		}
	};

	const googleLogin = async () => {
		setLoading(true);
		try {
			const results = await auth.signInWithPopup(googleAuthProvider);
			if (results.user.emailVerified) {
				const { token } = await results.user.getIdTokenResult();
				requests
					.authenticate(token)
					.then((res) => {
						loginPostProcess(token, res);
					})
					.catch((err) => {
						toast.error(
							'failed to authenticate with firebase! Error:' + err.message
						);
					});
			}
		} catch (e) {
			setLoading(false);
			toast.error('login failed: ' + e.message);
		}
	};

	const loginPostProcess = async (token, user) => {
		dispatch({
			type: userConstants.LOGGED_IN_USER,
			payload: {
				token,
				...user,
			},
		});
		await getUserCart(token).then(({ products }) => {
			const cart = products.map((p) => {
				return { ...p.product, count: p.count };
			});
			dispatch({
				type: cartConstants.ADD_TO_CART,
				payload: cart,
			});
		});

		// redirect(user);
	};

	const redirect = (user) => {
		const originalPage = history.location.state;
		if (originalPage) {
			history.push(originalPage.from);
		} else {
			history.push(routeGuider(user.role));
		}
	};

	const loginForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<input
					name='email'
					type='email'
					className='form-control'
					value={email}
					onChange={handleChange}
					autoFocus
					placeholder='Username'
				/>
			</div>
			<div className='form-group'>
				<input
					name='password'
					type='password'
					className='form-control'
					value={password}
					onChange={handleChange}
					placeholder='Password'
				/>
			</div>
			<br />
			{/* <button type='submit' className='btn btn-raised btn-primary'>
				Login
			</button> */}
			<Button
				onClick={handleSubmit}
				htmlType='submit'
				type='primary'
				className='mb-3'
				block
				shape='round'
				icon={<MailOutlined />}
				size='large'
				disabled={!email || password.length < 6}
			>
				Login with email and password
			</Button>
		</form>
	);
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					{loading ? (
						<h4 className='text-danger'>
							Loading{'\u00A0'}
							<Spinner isShow='true' />
						</h4>
					) : (
						<h4>Login</h4>
					)}
					{loginForm()}
					<Button
						onClick={googleLogin}
						type='danger'
						className='mb-3'
						block
						shape='round'
						icon={<GoogleOutlined />}
						size='large'
					>
						Login with Google
					</Button>
					<Link to='/account/reset-password' className='float-right'>
						Forgot Password
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
