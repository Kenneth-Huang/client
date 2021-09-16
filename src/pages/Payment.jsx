import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../components/form/CheckOutForm';
import '../CheckoutForm.css';

function Payment() {
	const promise = loadStripe(
		process.env.REACT_APP_STRIPE_KEY
	);
	return (
		<div className='container-fluid text-center pt-2 mx-2'>
			<h4>Complete your purchase</h4>
			{/* <p>4242 4242 4242 4242</p> */}

			<Elements stripe={promise}>
				<div className='col-md-8 offset-md-2'>
					<CheckOutForm />
				</div>
			</Elements>
		</div>
	);
}

export default Payment;
