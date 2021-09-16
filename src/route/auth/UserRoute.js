import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingAndRedirect from '../LoadingAndRedirect';

function UserRoute({ Component, ...rest }) {
	const { user } = useSelector((state) => state);
	const authenticated = user && user.token;

	return authenticated ? (
		<Route {...rest} render={(props) => <Component {...props} />} />
	) : (
		<LoadingAndRedirect />
	);
}

export default UserRoute;

// return (  <Route {...rest} render={props => (
// 	isLogin() ?
// 		<Component {...props} />
// 	: <Redirect to="/signin" />
// )} />)
