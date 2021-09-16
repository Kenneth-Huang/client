import { userConstants } from '../constants';

function userReducer(state = null, action) {
	switch (action.type) {
		case userConstants.LOGGED_IN_USER:
			return action.payload;
		case userConstants.LOGOUT:
			return action.payload;
		case userConstants.UPDATE_USER:
			return { ...state, address: action.payload };
		default:
			return state;
	}
}

export default userReducer;
