import React, { useState } from 'react';
import { auth } from '../../helpers/firebase';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

const Register = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const config = {
			url:
				process.env.REACT_APP_REGISTER_REDIRECT_URL,
				handleCodeInApp: true,
		};
		await auth
			.sendSignInLinkToEmail(email, config)
			.then(() => {
				window.localStorage.setItem('signInEmail', email);
				toast.success(
					`Email is sent to ${email}, please click the link inside your mailbox to complete`
				);
			})
			.catch((error) => {
				const errorMessage = error.message;
				toast.error(errorMessage);
			})
			.finally(() => {
				setLoading(false);
				setEmail('');
			});
	};
	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type='email'
				className='form-control'
				value={email}
				onChange={handleChange}
				autoFocus
				placeholder='Please input your email address'
			/>
			<br />
			<Spinner isShow={loading} />
			<button
				type='submit'
				disabled={!email}
				className='btn btn-raised btn-primary'
			>
				Register
			</button>
		</form>
	);
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Register</h4>
					{registerForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;
