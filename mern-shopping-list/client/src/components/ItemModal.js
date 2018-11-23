import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from "../actions/itemActions";

class ItemModal extends Component {

    state = {
        modal: false,
        name: ''
    };

    toggle = () => {
        this.setState({modal: !this.state.modal})
    };

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value })
    };

    onSubmit = e => {
        e.preventDefault();
        const newItem = {
            name: this.state.name || "Unknown Item Name"
        };
        // Add item via addItem action
        this.props.addItem(newItem);
        // Close the modal
        this.toggle()
    };

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: "2rem", marginLeft: "1rem"}}
                    onClick={this.toggle}
                >Add Item</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add To Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">
                                    Item
                                </Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: "2rem"}}
                                    block
                                >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

ItemModal.propTypes = {
    addItem: PropTypes["func"].isRequired,
    itemReducer: PropTypes["object"]
};

const mapStateToProps = state => ({
    itemReducer: state.itemReducer
});

export default connect(mapStateToProps, { addItem })(ItemModal);