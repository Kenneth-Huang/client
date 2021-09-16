import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL;

const upLoadImage = async (token, file) => {
	const config = {
		method: 'POST',
		url: `${apiURL}/media/image`,
		headers: {
			token,
		},
		data: {
			file,
		},
	};

	return await axios(config)
		.then((res) => {
			return res.data;
		})
		.catch(handleAxiosError);
};

const fetchImages = async () => {
	return await axios
		.get(`${apiURL}/media/images`)
		.then((res) => {
			return res.data;
		})
		.catch(handleAxiosError);
};

const removeImage = async (token, id) => {
	return await axios
		.delete(`${apiURL}/media/image`, {
			data: { public_id: id },
			headers: { token },
		})
		.then((res) => {
			return res.data;
		})
		.catch(handleAxiosError);
};

export { upLoadImage, fetchImages, removeImage };
