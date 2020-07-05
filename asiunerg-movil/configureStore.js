import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
/* Importar el reduser */
import { RootReducer } from './store/reducers/RootReducer';

const middlewares = [thunk];

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export const store = createStoreWithMiddleware(RootReducer)
