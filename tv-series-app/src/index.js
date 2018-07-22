import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

const getCurrentDate = () => {
    const date = new Date();
    return date.toDateString();
};

const greeting = React.createElement('h3', {}, 'Hello World!');

const greetingJSX = <h3>Current Date : {getCurrentDate()} </h3>;

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

ReactDOM.render(greeting, document.getElementById('g1'));
ReactDOM.render(greetingJSX, document.getElementById('g2'));

registerServiceWorker();
