import { combineReducers } from 'redux';
import user from './userReducer';
import search from './searchReducer';
import cart from './cartReducer';
import drawer from './drawerReducer';
import coupon from './couponReducer';

const rootReducer = combineReducers({ user, search, cart, drawer, coupon });

export default rootReducer;
