import React, { useState } from 'react';
import UserSideBar from '../../components/nav/UserSideBar';
import { auth } from '../../helpers/firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Spinner from '../../components/Spinner';

function Password({ history }) {
	const [password, setPassword] = useState('');
	const [isLoading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let user = auth.currentUser;
		await user
			.updatePassword(password)
			.then(() => {
				toast.success('Password updated successfully');
			})
			.catch((err) => {
				toast.error('Password reset error: ' + err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const PasswordUpadateForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label htmlFor='passwrod'>Your password: </label>

				<input
					name='password'
					type='password'
					className='form-control'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Rest Your Password Here'
					autoFocus
					disabled={isLoading}
				/>
			</div>
			<br />
			<Button
				onClick={handleSubmit}
				htmlType='submit'
				type='primary'
				className='mb-3'
				block
				shape='round'
				icon={<MailOutlined />}
				size='large'
				disabled={password.length < 6 || isLoading}
			>
				Login with email and password
			</Button>
		</form>
	);

	return (
		<div className='container-fluid mt-3'>
			<div className='row'>
				<div className='col-md-2'>
					<UserSideBar />
				</div>
				<div className='col-md-6 offset-md-1'>
					{isLoading ? (
						<h4 className='text-danger'>
							Password updating{'\u00A0'}
							<Spinner isShow='true' />
						</h4>
					) : (
						<h4>Password update</h4>
					)}

					<PasswordUpadateForm />
				</div>
			</div>
		</div>
	);
}

export default Password;
