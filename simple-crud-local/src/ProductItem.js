import React from 'react';

export default class ProductItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEdit: false
        };

        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    onDelete(){
        const { id, onDelete } = this.props;
        onDelete(id);
    }

    onEdit(){
        this.setState({isEdit: true});
    }

    onEditSubmit(e) {
        e.preventDefault();

        const { id, onEditSubmit } = this.props;
        onEditSubmit(id, this.name.value, this.price.value);
        this.setState({isEdit: false})
    }

    render() {
        const { name, price } = this.props;

        return (
            <div>
                {
                    this.state.isEdit
                        ? (
                            <div>
                                <form onSubmit={this.onEditSubmit}>
                                <input type="text" placeholder="Name" ref={ name => this.name = name } defaultValue={name} />
                                <input type="text" placeholder="Price" ref={ price => this.price = price } defaultValue={price} />
                                <button type="submit">Save</button>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <span>{name}</span>
                                {` | `}
                                <span>{price}</span>
                                {` | `}
                                <button onClick={this.onEdit}>Edit</button>
                                {` | `}
                                <button onClick={this.onDelete}>Delete</button>
                            </div>
                        )
                }
            </div>
        );
    }

}