import axios from 'axios';
import handleAxiosError from './handleAxiosError';

const apiURL =
	process.env.REACT_APP_API_URL;

const authenticate = async (token) => {
	const config = {
		method: 'post',
		url: `${apiURL}/user/authenticate`,
		headers: {
			token,
		},
	};
	return await axios(config)
		.then((res) => res.data)
		.then((user) => {
			return user;
		})
		.catch(handleAxiosError);
};

const getCurrentUser = async (token) => {
	const config = {
		method: 'get',
		url: `${apiURL}/user/current`,
		headers: {
			token,
		},
	};

	return await axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

const getCurrentAdmin = async function (token) {
	const config = {
		method: 'GET',
		url: `${apiURL}/user/admin`,
		headers: { token },
	};
	return await axios(config)
		.then((res) => res.data)
		.catch(handleAxiosError);
};

//---fetch method bellow:
// const fetchData = async (token) => {
// 	let myHeaders = new Headers();
// 	myHeaders.append('authtoken', token + 'd');
// 	myHeaders.append('Cookie', 'language=en-US');

// 	const raw = '';

// 	const requestOptions = {
// 		method: 'POST',
// 		headers: myHeaders,
// 		body: raw,
// 		redirect: 'follow',
// 	};

// 	return await fetch(
// 		'http://localhost:8000/api/user/authenticate',
// 		requestOptions
// 	).then(handleResponse);
// };

// function handleResponse(response) {
// 	console.log('response', response);
// 	return response.text().then((result) => {
// 		// typeof result is string
// 		const resultJSON = result && JSON.parse(result);
// 		console.log('result:', result);
// 		if (!response.ok) {
// 			// if (response.status == 400) {
// 			// 	logout();
// 			// }
// 			const error = resultJSON.message || response.statusText;
// 			// console.log('response not ok:', resultJSON);
// 			return Promise.reject(error);
// 		}
// 		return resultJSON;
// 	});
// }
export { authenticate, getCurrentUser, getCurrentAdmin };
