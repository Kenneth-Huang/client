import { couponConstants } from '../constants';

const couponReducer = (state = false, { type, payload }) => {
	switch (type) {
		case couponConstants.APPLY_COUPON:
			return payload;

		default:
			return state;
	}
};

export default couponReducer;
