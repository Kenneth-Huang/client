import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL;

const getWishlist = async (token) => {
	return await axios
		.get(`${apiURL}/user/wishlist`, {
			headers: { token },
		})
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const addProductToWishlist = async (token, productId) => {
	return await axios
		.post(`${apiURL}/user/wishlist`, { productId }, { headers: { token } })
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const removeProductFromWishlist = async (token, productId) => {
	return await axios
		.put(
			`${apiURL}/user/wishlist/${productId}`,
			{},
			{
				headers: { token },
			}
		)
		.then((res) => res.data)
		.catch(handleAxiosError);
};
export { getWishlist, addProductToWishlist, removeProductFromWishlist };
