import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL;

const createProduct = (token, product) => {
	const config = {
		method: 'POST',
		url: `${apiURL}/products/product`,
		headers: {
			token,
		},
		data: {
			...product,
		},
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getAllProducts = () => {
	const config = {
		method: 'GET',
		url: `${apiURL}/products/products`,
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getProductsByCount = (count) => {
	return axios
		.get(`${apiURL}/products/products/${count}`)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getProductsCount = () => {
	return axios
		.get(`${apiURL}/products/count`)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getProductsByConditions = (order, countPerpage, currentPage) => {
	const config = {
		method: 'POST',
		url: `${apiURL}/products/products`,
		data: {
			order,
			countPerpage,
			currentPage,
		},
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getProduct = (slug) => {
	const config = {
		method: 'GET',
		url: `${apiURL}/products/product/${slug}`,
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const updateProduct = (token, product) => {
	const config = {
		method: 'PUT',
		url: `${apiURL}/products/product/${product.slug}`,
		headers: {
			token,
		},
		data: {
			...product,
		},
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const deleteProduct = async (token, slug) => {
	return await axios
		.delete(`${apiURL}/products/product/${slug}`, {
			headers: { token },
		})
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getProductRating = async (token, slug) => {
	const config = {
		method: 'GET',
		url: `${apiURL}/products/star/${slug}`,
		headers: {
			token,
		},
	};
	return await axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const setProductRating = async (token, slug, star) => {
	const config = {
		method: 'PUT',
		url: `${apiURL}/products/star/${slug}`,
		headers: {
			token,
		},
		data: {
			star,
		},
	};
	return await axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getProductAvgRating = async (slug) => {
	return axios
		.get(`${apiURL}/products/star/avg/${slug}`)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getRelatedProducts = async (slug) => {
	return axios
		.get(`${apiURL}/products/product/relation/${slug}`)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getProductsCountByFilter = async (filterObj) => {
	return axios
		.get(
			`${apiURL}/products/product-count/filters?${filterObj.type}=${filterObj.slug}`
		)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getProductByFilter = (filterObj, order, countPerpage, currentPage) => {
	const config = {
		method: 'POST',
		url: `${apiURL}/products/products/filters?${filterObj.type}=${filterObj.slug}`,
		data: {
			order,
			countPerpage,
			currentPage,
		},
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const searchFilter = (filter) => {
	const config = {
		method: 'POST',
		url: `${apiURL}/products/products/search`,
		data: filter,
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getHighestPriceProduct = () => {
	const config = {
		method: 'POST',
		url: `${apiURL}/products/products/highest-price/1`,
		data: {
			order: { price: -1 },
		},
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

export {
	getAllProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductsByCount,
	getProductsCount,
	getProductsByConditions,
	getProductRating,
	setProductRating,
	getProductAvgRating,
	getRelatedProducts,
	getProductsCountByFilter,
	getProductByFilter,
	searchFilter,
	getHighestPriceProduct,
};
