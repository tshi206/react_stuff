import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';
import Main from "../Main/Main";


// Custom component's name must start with capital letter(s) otherwise React will see it as builtin JSX elements (e.g, h1, p, div, etc.)
class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">TV Series List</h1>
                </header>

                <Main/>

            </div>
        );
    }

}

export default App;
