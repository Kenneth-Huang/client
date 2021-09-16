import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL;

const getAllCoupons = async () => {
	return await axios
		.get(`${apiURL}/coupon/coupons`)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const createCoupon = async (token, coupon) => {
	return await axios
		.post(`${apiURL}/coupon/coupon`, { coupon }, { headers: { token } })
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const removeCoupon = async (token, id) => {
	return await axios
		.delete(`${apiURL}/coupon/coupon/${id}`, {
			headers: { token },
		})
		.then((res) => res.data)
		.catch(handleAxiosError);
};

export { getAllCoupons, createCoupon, removeCoupon };
