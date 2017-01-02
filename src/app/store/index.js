import {createStore,applyMiddleware} from 'redux'
import swaggerReducer from '../reducers/index'
import thunk from 'redux-thunk';

export default function ConfigureStore() {
    return createStore(
        swaggerReducer,
        applyMiddleware(thunk)
    );
}