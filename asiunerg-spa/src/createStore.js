import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from 'store/reducers/RootReducer';

export const middlewares = [thunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export const store = createStoreWithMiddleware(RootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
