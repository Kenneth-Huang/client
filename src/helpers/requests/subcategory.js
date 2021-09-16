import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL;

const createSubcategory = (token, name, parentId) => {
	const config = {
		method: 'POST',
		url: `${apiURL}/products/subcategory`,
		headers: {
			token,
		},
		data: {
			name,
			parentId,
		},
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getAllSubcategories = () => {
	const config = {
		method: 'GET',
		url: `${apiURL}/products/subcategories/`,
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getSubcategoriesByCategory = (categoryId) => {
	const config = {
		method: 'GET',
		url: `${apiURL}/products/subcategories/${categoryId}`,
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getSubcategoryBySlug = (slug) => {
	const config = {
		method: 'GET',
		url: `${apiURL}/products/subcategory/${slug}`,
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const updateSubcategory = (token, slug, newName, parentId) => {
	const config = {
		method: 'PUT',
		url: `${apiURL}/products/subcategory/${slug}`,
		headers: {
			token,
		},
		data: {
			name: newName,
			parentId,
		},
	};
	return axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const deleteSubcategory = async (token, slug) => {
	return await axios
		.delete(`${apiURL}/products/subcategory/${slug}`, {
			headers: { token },
		})
		.then((res) => res.data)
		.catch(handleAxiosError);
};

export {
	getAllSubcategories,
	getSubcategoriesByCategory,
	getSubcategoryBySlug,
	createSubcategory,
	updateSubcategory,
	deleteSubcategory,
};
