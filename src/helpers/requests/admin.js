import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL 

const getOrders = async (token) => {
	return await axios
		.get(`${apiURL}/admin/orders`, {
			headers: { token },
		})
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const updateOrderStatus = async (token, id, orderStatus, paymentStatus) => {
	return await axios
		.post(
			`${apiURL}/admin/order`,
			{ id, orderStatus, paymentStatus },
			{ headers: { token } }
		)
		.then((res) => res.data)
		.catch(handleAxiosError);
};
export { getOrders, updateOrderStatus };
