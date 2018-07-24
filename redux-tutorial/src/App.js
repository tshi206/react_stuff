import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// imports our action creators
import { updateUser, apiRequest } from "./actions/user-actions";

class App extends Component {

    componentDidMount() {
        setTimeout( () => {
            this.props.onApiRequest()
        }, 2000)
    }

    onUpdateUser = (e) => {
        this.props.onUpdateUser(e.target.value)
    };

    render() {
        console.log(this.props);

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <input onChange={this.onUpdateUser} />
                {this.props.user}
            </div>
        );
    }
}

// receive the state of our store and then we can use that state it provides to decide what props we should pass to our components
// basically a mapper which map the state of the store to props of the targeted component
// TODO: below mapStateToProps has been refactored to use selectors from reselect lib
// const mapStateToProps = ( state, props ) => {
//     console.log(props);
//     // noinspection JSUnresolvedVariable
//     return {
//         products: state.products,
//         user: state.user,
//         userPlusProps: `${state.user} + ${props.aRandomProps}`
//     }
// };
// TODO: below selector has been refactored to use a composition of multiple small selectors since selectors are composible. this help maximize performance because only selectors that are changed are recomputed.
// selectors help minimize our store's size
// const mapStateToProps = createSelector(
//     // we can have up to 12 parameterized selectors, and the last argument is always the combiner
//     // first argument (selector 1) is a callback that takes store state
//     state => state.products,
//     // second argument (selector 2) is also a callback that takes store state, and so on... up to 12
//     state => state.user,
//     // combiner: the last argument is the callback that takes the results of all the preceding arguments (selectors)
//     (products, user) => ({
//         products,
//         user
//     })
// );

const productSelector = createSelector(
    state => state.products,
    products => products
);

const userSelector = createSelector(
    state => state.user,
    user => user
);

const mapStateToProps = createSelector(
    // we can have up to 12 parameterized selectors, and the last argument is always the combiner
    // selector 1
    productSelector,
    // selector 2
    userSelector,
    // combiner: the last argument is the callback that takes the results of all the preceding arguments (selectors)
    (products, user) => ({
        products,
        user
    })
);


// a mapper which maps actions('dispatched packets') to the targeted component's props
// this way we can easily dispatch actions from our component without calling store.dispatch() all around the component's body (or 'class')
// we can just call functions that will automatically dispatch actions to the store
const mapActionsToProps = ( dispatch, props ) => {
    console.log(props);
    // dispatch needs to be explicitly bound to the action
    return bindActionCreators({
        // updateUser is our action creator
        onUpdateUser: updateUser,
        onApiRequest: apiRequest,
    }, // the second argument is the dispatch and we use bindActionCreators() to bind our action creator to the dispatch
        dispatch)
};

// propsFromState: whatever we return from mapStateToProps(...)
// propsFromDispatch: whatever we return from mapActionsToProps(...)
// ownProps: the passed in props from elsewhere (e.g, from its parent component)
// TODO: merge props if you are keen
// const mergeProps = ( propsFromState, propsFromDispatch, ownProps ) => {
//     // the result of mergeProps is the end product which our component will eventually receive. The end product is namely the merged props which we can create by any means however we like since we have access to all the props from three different sources.
//     console.log(propsFromState, propsFromDispatch, ownProps);
//     return propsFromState;
// };

// curried function, partial application
export default connect(
    mapStateToProps,
    mapActionsToProps,
    // mergeProps // too lazy to merge props although one example has been provided above
)(App);
