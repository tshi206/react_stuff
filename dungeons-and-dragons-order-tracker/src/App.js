import React, { Component } from 'react';
import './App.css';

import Card from './pure_components/Card';
import { randomId } from "./dirty_components/Util";
import { defaultElements } from "./dirty_components/Constants";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: defaultElements
        };
        this.updateName = this.updateName.bind(this);
        this.updateInitiative = this.updateInitiative.bind(this);
        this.updateHitpoints = this.updateHitpoints.bind(this);
        this.addCard = this.addCard.bind(this);
        this.removeElement = this.removeElement.bind(this);
    }

    updateName(id, e) {
        const { value } = e.target;
        const elements = this.state.elements;
        const index = elements.findIndex(el => el.id === id);
        elements[index].value = value;
        this.setState({ elements })
    }

    updateHitpoints(id, e) {
        const { value } = e.target;
        const elements = this.state.elements;
        const index = elements.findIndex( el => el.id === id );
        elements[index].hitpoints = Number(value);
        this.setState({ elements })
    }

    updateInitiative(id, e) {
        clearTimeout(this.timeout);
        const { value } = e.target;
        const elements = this.state.elements;
        const index = elements.findIndex(el => el.id === id);
        elements[index].initiative = Number(value);
        this.setState({ elements });
        this.timeout = setTimeout( () => this.sortElements(), 500);
    }

    sortElements() {
        const { elements } = this.state;
        this.setState({
            elements: elements.sort(
                (l, r) => r.initiative - l.initiative )
        })
    }

    addCard() {
        const { elements } = this.state;
        elements.push({
            id: randomId(),
            value: "Player #" + (elements.length + 1),
            initiative: 0,
            hitpoints: 0
        });
        this.setState({
            elements: elements.sort(
                (l, r) => r.initiative - l.initiative )
        })
    }

    removeElement(id) {
        let { elements } = this.state;
        elements = elements.filter( el => el.id !== id);
        this.setState({ elements })
    }

    render() {
        const { elements } = this.state;
        return (
            <div className="App">
                <button className="add" onClick={this.addCard} >Add</button>
                {
                    elements.map( element =>
                        <Card
                            key={element.id}
                            onNameChange={this.updateName}
                            onInitiativeChange={this.updateInitiative}
                            onHitpointsChange={this.updateHitpoints}
                            onRemove={this.removeElement}
                            {...element}
                        />
                    )
                }
            </div>
        );
    }
}

export default App;
