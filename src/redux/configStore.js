import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// import { createLogger } from 'redux-logger';
// const loggerMiddleware = createLogger();

export default function configStore(initStore) {
	return createStore(
		rootReducer,
		initStore,
		compose(
			applyMiddleware(thunk)
			// window.__REDUX_DEVTOOLS_EXTENSION__ &&
			// 	window.__REDUX_DEVTOOLS_EXTENSION__() //add suport for redux  dev tool)
		)
	);
}
