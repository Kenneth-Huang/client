import React, { useState } from 'react';
import { auth } from '../../helpers/firebase';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

function ResetPassword({ history }) {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const config = {
			url:
				process.env.REACT_APP_RESET_PASSWORD_REDIRECT_URL,
				handleCodeInApp: true,
		};
		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				toast.success(
					`Email is sent to ${email}, please click the link inside to reset your password`
				);
			})
			.catch((error) => {
				const errorMessage = error.message;
				toast.error(errorMessage);
			})
			.finally(() => {
				setEmail('');
				setLoading(false);
			});
		history.push('/login');
	};
	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const resetPasswordForm = () => (
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
				Submit
			</button>
		</form>
	);
	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Reset Password</h4>
					{resetPasswordForm()}
				</div>
			</div>
		</div>
	);
}

export default ResetPassword;
