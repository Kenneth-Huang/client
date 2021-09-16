import { drawerConstants } from '../constants';
function drawerReducer(state = false, { type, payload }) {
	switch (type) {
		case drawerConstants.SET_CARTDRAWER_VISIBLE:
			return payload;
		default:
			return state;
	}
}

export default drawerReducer;
