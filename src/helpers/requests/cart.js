import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL;

const getUserCart = async (token) => {
	return await axios
		.get(`${apiURL}/cart`, {
			headers: { token },
		})
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const saveUserCart = async (token, cart) => {
	return await axios
		.post(
			`${apiURL}/cart`,
			{ cart },
			{
				headers: { token },
			}
		)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const emptyUserCart = async (token) => {
	return await axios
		.delete(`${apiURL}/cart`, {
			headers: { token },
		})
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const saveUserAddress = async (token, address) => {
	return await axios
		.post(`${apiURL}/user/address`, { address }, { headers: { token } })
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const applyCoupon = async (token, coupon) => {
	return await axios
		.post(
			`${apiURL}/cart/coupon`,
			{
				coupon,
			},
			{ headers: { token } }
		)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

export {
	saveUserCart,
	getUserCart,
	emptyUserCart,
	saveUserAddress,
	applyCoupon,
};
