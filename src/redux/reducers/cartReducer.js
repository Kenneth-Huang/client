import { cartConstants } from '../constants';

let initialState = [];

if (typeof window !== undefined) {
	if (localStorage.getItem('cart'))
		initialState = JSON.parse(localStorage.getItem('cart'));
	else initialState = [];
}

const cartReducer = (cart = initialState, { type, payload }) => {
	switch (type) {
		case cartConstants.ADD_TO_CART: {
			localStorage.setItem('cart', JSON.stringify(payload));
			return payload;
		}
		case cartConstants.CHANGE_COLOR: {
			cart.forEach((p, index) => {
				if (p._id === payload._id) cart[index].color = payload.color;
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			return cart;
		}
		case cartConstants.CHANGE_COUNT: {
			const newCart = cart.map((p) => {
				if (p._id === payload._id) return { ...p, count: payload.count };
				return p;
			});
			localStorage.setItem('cart', JSON.stringify(newCart));
			return newCart;
		}
		case cartConstants.REMOVE_ITEM: {
			const newCart = cart.filter((p) => p._id !== payload._id);
			localStorage.setItem('cart', JSON.stringify(newCart));
			return newCart;
		}
		case cartConstants.EMPTY_CART: {
			localStorage.removeItem('cart');
			return [];
		}

		////////////////////////////////
		//The approach bellow would not trigger the Cart.jsx hold page refresh
		////////////////////////////////
		// case cartConstants.CHANGE_COUNT: {
		// 	cart.forEach((p, index) => {
		// 		if (p._id === payload._id) cart[index].count = payload.count;
		// 	});
		// 	localStorage.setItem('cart', JSON.stringify(cart));
		// 	console.log('car reducer, CHANGE_COUNT: ', cart);
		// 	return cart;
		// }
		default:
			return cart;
	}
};

export default cartReducer;
