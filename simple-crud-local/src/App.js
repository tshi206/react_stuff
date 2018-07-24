import React, { Component } from 'react';
import UUID from 'uuid';
import './App.css';

import ProductItem from './ProductItem';
import AddItem from "./AddItem";

const products = [
    {
        id: UUID.v4(),
        name: 'iPad',
        price: 200
    },
    {
        id: UUID.v4(),
        name: "iPhone",
        price: 650
    }
];

// analogous to sessionStorage but persistent across sessions
if (localStorage.getItem('products') === null) {
    localStorage.setItem("products", JSON.stringify(products));
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products : []
        };

        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    componentWillMount(){
        const products = App.getProducts();
        this.setState({
            products
        })
    }

    static getProducts() {
        const stringifyProducts = localStorage.getItem('products');
        const products = JSON.parse(stringifyProducts);
        console.log(products);

        return products;
    }

    onDelete(id) {
        const products = App.getProducts();
        const filteredProducts = products.filter( p => p.id !== id );
        this.setState({
            products: filteredProducts
        }, () => localStorage.setItem('products', JSON.stringify(filteredProducts))
        )
    }

    onAdd(name, price){
        let newList = App.getProducts();
        newList.push({
            id: UUID.v4(), name: name, price: price
        });
        this.setState({
            products: newList
        }, () => localStorage.setItem('products', JSON.stringify(newList))
        )
    }

    onEditSubmit(id, name, price) {
        let updatedList = App.getProducts().map( p => {
            if (p.id === id) { p.name = name; p.price = price; }
            return p;
        });
        this.setState({
            products: updatedList
        }, () => localStorage.setItem('products', JSON.stringify(updatedList))
        )
    }

    render() {
        // { ...p } is the es6 spread operator
        // { ...p } is equivalent to id={p.id} name={p.name} price={p.price}
        return (
            <div className="App">
                <h1>Products Manager</h1>

                <AddItem onAdd={this.onAdd}/>

                {
                    this.state.products.map( p => (
                        <ProductItem
                            key={p.id}
                            { ...p }
                            onDelete={this.onDelete}
                            onEditSubmit={this.onEditSubmit} />
                    ))
                }

            </div>
        );
    }
}

export default App;
