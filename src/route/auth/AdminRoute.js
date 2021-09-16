import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingAndRedirect from '../LoadingAndRedirect';
import * as requests from '../../helpers/requests/auth';

function AdminRoute({ Component, ...rest }) {
	const { user } = useSelector((state) => state);
	const [isAdmin, setAdmin] = useState(false);
	useEffect(() => {
		if (user && user.token) {
			requests
				.getCurrentAdmin(user.token)
				.then((res) => {
					setAdmin(true);
				})
				.catch((err) => {
					setAdmin(false);
				});
		}
	}, [user]);

	return user && user.token && isAdmin ? (
		<Route {...rest} render={(props) => <Component {...props} />} />
	) : (
		<LoadingAndRedirect />
	);
}

export default AdminRoute;
