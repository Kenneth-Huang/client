import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { auth } from '../../helpers/firebase';
import * as requests from '../../helpers/requests/auth';
import routeGuider from '../../route/routeGuider';
import { userConstants } from '../../redux/constants';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

const RegisterComplete = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		setEmail(window.localStorage.getItem('signInEmail'));
	}, []);

	const handleChange = (e) => {
		e.target.name === 'username'
			? setUsername(e.target.value)
			: setPassword(e.target.value);
	};

	const isFormValid = (email, username, password) => {
		if (!email || !username || !password) {
			toast.error('username and password are required');
			return false;
		}
		if (password.length < 6) {
			toast.error('Password must be at least 6 characters');
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isFormValid(email, username, password)) {
			try {
				const results = await auth.signInWithEmailLink(
					email,
					window.location.href
				);
				if (results.user.emailVerified) {
					window.localStorage.removeItem('signInEmail');
					let user = auth.currentUser;
					await user.updatePassword(password);
					await user.updateProfile({
						displayName: username,
						// photoURL: 'https://example.com/jane-q-user/profile.jpg',
					});
					const { token } = await user.getIdTokenResult();
					await requests
						.authenticate(token)
						.then((res) => {
							dispatch({
								type: userConstants.LOGGED_IN_USER,
								payload: {
									token,
									...res,
								},
							});
							history.push(routeGuider(res.role));
						})
						.catch((err) => {
							toast.error(
								'failed to authenticate with firebase! Error:' + err.message
							);
						});
				}
			} catch (e) {
				toast.failure(e.message);
			}
		}
	};

	const registerCompleteForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<input
					type='email'
					className='form-control'
					defaultValue={email}
					readOnly
				/>
			</div>

			<div className='form-group'>
				<input
					name='username'
					type='text'
					className='form-control'
					value={username}
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
			<button type='submit' className='btn btn-raised btn-primary'>
				Register
			</button>
		</form>
	);
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Register Complete</h4>
					{registerCompleteForm()}
				</div>
			</div>
		</div>
	);
};

// RegisterComplete.propTypes = {};

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

export default RegisterComplete;
