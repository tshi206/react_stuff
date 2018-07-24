import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import BadBoy from './components/BadBoy';

class Test extends React.Component {

    state = {
        title: "bu bu",
        fword: "F***",
        sword: "S***"
    };

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    // noinspection JSMethodCanBeStatic
    onSubmit(event) {
        event.preventDefault();

        alert("HALEAKALA WAT DID U DO????" + this.input.value);
    }

    // noinspection JSMethodCanBeStatic
    onChange(e){
        console.log(e.target.value);
    }

    render() {
        const list = [
            'item 1',
            'item 2',
            'item 3'
        ];

        let random_boolean = Math.random() >= 0.5;

        return (
            <div className="App">
                <h1>{ this.state.title === "bu bu" ? "Guess what? I'm a h1" : this.state.title }</h1>
                <div onClick={this.changeH1.bind(this)} > Click me if u dare!!! </div>
                <h1>
                    {
                        random_boolean ? <p>"LEL"</p> : <p>"LOL"</p>
                    }
                    {
                        list.map( item => (
                            <div key={item} onMouseOver={this.onMouseOverListener.bind(this)}>
                                {item}
                            </div>
                        ))
                    }
                </h1>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onChange.bind(this)} ref={ input => this.input = input } />
                </form>

                <BadBoy parent="dad" word="if I see you ever listen to his songs again I'm gonna break your legs is this understood?" onClick={this.changeH1.bind(this)} fword={this.state.fword} sword={this.state.sword} />

                <br/> <br/> <br/>
            </div>
        );
    }

    // noinspection JSMethodCanBeStatic
    onMouseOverListener(e) {
        console.log(e.target);
    }

    changeH1() {
        let title = "U JUST BROKE MY HEART";
        let fword = <code>Syntax Error 0618: fword not allowed here;</code>;
        let sword = <code>Syntax Error 0618: sword not allowed here;</code>;
        this.setState({
            title, fword, sword
        })
    }
}

ReactDOM.render(<Test />, document.getElementById('test'));
registerServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
