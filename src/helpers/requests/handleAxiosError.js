const handleAxiosError = (error) => {
	const { response } = error;
	if (response) {
		const { message } = response.data;
		const confirmation =
			'The token has expired, click yes to refresh the page for a new token';

		if (message) {
			if (message.includes('Firebase ID token has expired')) {
				if (window.confirm(confirmation)) window.location.reload();
			}
			return Promise.reject({
				message,
				status: response.status,
			});
		} else
			return Promise.reject({
				message: response.data,
				status: response.status,
			});
	}
	// else if (request) {
	// 	console.log('request error:', JSON.stringify(request));
	// 	return Promise.reject({ message: error.request.message, status: 500 });
	// } else
	return Promise.reject({
		message: error && error.message ? error.message : 'Unknown error',
		status: 500,
	});
};

export default handleAxiosError;
