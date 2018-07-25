import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import combinedReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const rootReducer = combinedReducer;

// param list: root reducer, preloadedState, enhancer
// noinspection JSUnresolvedVariable
export const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // if the condition is true then...
        window.devToolsExtension && window.devToolsExtension())
);