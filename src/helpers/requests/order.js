import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL;

const createOrder = async (token, paymentIntent) => {
	return await axios
		.post(`${apiURL}/order/order`, { paymentIntent }, { headers: { token } })
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getOrders = async (token) => {
	return await axios
		.get(`${apiURL}/order/orders`, {
			headers: { token },
		})
		.then((res) => res.data)
		.catch(handleAxiosError);
};
export { createOrder, getOrders };
