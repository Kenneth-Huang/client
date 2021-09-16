import { USER_ROLES } from '../constants';

const routeGuider = (role) => {
	switch (role) {
		case USER_ROLES.ADMIN:
			return '/admin/dashboard';
		case USER_ROLES.SUBSCRIBER:
			return '/user/order-history';
		default:
			return '/';
	}
};

export default routeGuider;
