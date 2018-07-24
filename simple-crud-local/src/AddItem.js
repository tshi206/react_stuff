import React from 'react';

export default class AddItem extends React.Component {

    onSubmit(e){
        e.preventDefault();
        const { onAdd } = this.props;

        console.log(this.name);
        console.log(this.price);

        // only createRef()'s instance will need to access the 'current' property. we are not using createRef() so we don't need to use 'current'.
        // essentially, what createRef() does is wrapping whatever html/jsx element inside and return a Ref object which has the 'current' property to access the current state of the Ref obj. it is more general since we can wrap any element inside a Ref, e.g., input, form, and even div. however, here we use lambda to directly obtain the instance of the input element we are not wrapping it inside anything so we can just use the default 'value' property of html's input element.
        // onAdd(this.name.current.value, this.price.current.value)
        onAdd(this.name.value, this.price.value);

        this.name.value = ""; this.price.value = "";
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h3>Add Product</h3>
                <input type="text" placeholder="Name" ref={ name => this.name = name } />
                <input type="text" placeholder="Price" ref={ price => this.price = price } />
                <button type="submit">Add</button>
                <hr/>
            </form>
        );
    }

}