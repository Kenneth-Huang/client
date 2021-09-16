import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL;

export const createPaymentIntent = async (token, item) => {
	return await axios
		.post(
			`${apiURL}/payment/stripe/create-payment-intent`,
			{ item },
			{
				headers: { token },
			}
		)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

export const createOCDPaymentIntent = async (token) => {
	return await axios
		.post(`${apiURL}/payment/cash-on-delivery`, {}, { headers: { token } })
		.then((res) => res.data)
		.catch(handleAxiosError);
};

export const refundPayment = async (token, paymentIntent) => {
	return await axios
		.post(
			`${apiURL}/payment/stripe/refund`,
			{ paymentIntent },
			{ headers: { token } }
		)
		.then((res) => res.data)
		.catch(handleAxiosError);
};
