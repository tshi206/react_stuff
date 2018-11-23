import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import { Provider } from 'react-redux';
import Store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from "reactstrap";

class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <div className="App">
                    <AppNavbar/>
                    <Container>
                        <ItemModal/>
                        <ShoppingList/>
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;
