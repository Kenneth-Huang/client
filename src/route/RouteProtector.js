import React from 'react';
import Spinner from '../components/Spinner';
import { Redirect } from 'react-router-dom';
import LoadingAndRedirect from './LoadingAndRedirect';
import { USER_ROLES } from '../constants';
import * as requests from '../helpers/requests/auth';
import { toast } from 'react-toastify';

const RouteProtector = (Component, user, role) => (props) => {
	const authenticated = user && user.token ? true : false;
	let adminUser = null;
	if (!authenticated) return <LoadingAndRedirect />;

	if (role === USER_ROLES.ADMIN) {
		adminUser = adminCheck(user); //need to wait until get the data
		if (adminUser._id !== user._id) {
			return <LoadingAndRedirect />;
		}
	} else return <Component history={props.history} />;
};

export default RouteProtector;

async function adminCheck(user) {
	await requests
		.getCurrentAdmin(user.token)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
}
