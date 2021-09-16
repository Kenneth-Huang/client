import { searchConstants } from '../constants';

function searchReducer(state = { searchText: '' }, action) {
	switch (action.type) {
		case searchConstants.SEARCH_QUERY:
			return { ...state, ...action.payload };

		default:
			return state;
	}
}

export default searchReducer;
