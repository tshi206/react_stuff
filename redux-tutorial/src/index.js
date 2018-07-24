import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from "./reducers/products-reducer";
import userReducer from "./reducers/user-reducer";


const allReducers = combineReducers({
    products: productsReducer,
    user: userReducer
});

// noinspection JSUnresolvedVariable
const allStoreEnhancers = compose(
    // thunk middleware has to come first because requests are falling through middlewares in a first come first serve manner
    applyMiddleware(thunk),
    // check if redux dev tool is enabled in browser, if it is then we pass in the dev tool extension instance as the third argument to our createStore()
    window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(
    allReducers,
    {
        products: [ {name : 'iPhone'} ],
        user: 'Micheal'
    },
    allStoreEnhancers
);

console.log(store.getState());



ReactDOM.render(
    <Provider store={store}>
        <App aRandomProps='whatever' />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
