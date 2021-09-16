import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL;

const createCategory = (token, name) => {
	const config = {
		method: 'POST',
		url: `${apiURL}/products/category`,
		headers: {
			token,
		},
		data: {
			name,
		},
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getAllCategories = () => {
	const config = {
		method: 'GET',
		url: `${apiURL}/products/categories`,
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getCategory = (slug) => {
	const config = {
		method: 'GET',
		url: `${apiURL}/products/category/${slug}`,
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const updateCategory = (token, slug, newName) => {
	const config = {
		method: 'PUT',
		url: `${apiURL}/products/category/${slug}`,
		headers: {
			token,
		},
		data: {
			name: newName,
		},
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const deleteCategory = async (token, slug) => {
	return await axios
		.delete(`${apiURL}/products/category/${slug}`, {
			headers: { token },
		})
		.then((res) => res.data)
		.catch(handleAxiosError);
};

export {
	getAllCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};
