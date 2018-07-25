import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from "./components/Posts";
import PostForm from "./components/PostForm";

import {Provider} from "react-redux";
import {store} from "./Store";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <PostForm/>
                    <Posts/>
                </div>
            </Provider>
        );
    }
}

export default App;
