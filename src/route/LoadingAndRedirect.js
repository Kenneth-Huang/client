import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function LoadingAndRedirect() {
	const [count, setCount] = useState(8);
	let history = useHistory();
	useEffect(() => {
		const interval = setInterval(() => {
			setCount(count - 1);
		}, 1000);
		if (count === 0) {
			history.push('/');
			toast.error('Error in authentication');
		}
		return () => clearInterval(interval);
	}, [count, history]);

	return (
		<div className='container p-5 text-center'>
			<h4>
				Loading{'\u00A0'}
				<Spinner isShow='true' />
			</h4>
		</div>
	);
}

export default LoadingAndRedirect;
