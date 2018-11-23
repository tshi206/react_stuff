import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from 'prop-types';
import loader from '../assets/loader.gif';

class ShoppingList extends Component {



    onDeleteClick = id => () => this.props.deleteItem(id);

    componentDidMount() {
        this.props.getItems();
    }

    render() {
        const { items } = this.props.itemReducer;
        return (
            <Container>
                {
                    (() => {
                        if (this.props.itemReducer.loading) return <img src={loader} alt="loading"/>;
                        return <ListGroup>
                            <TransitionGroup className="shopping-list">
                                {
                                    items.map( ({_id, name}) => (
                                        <CSSTransition key={_id} timeout={500} classNames="fade">
                                            <ListGroupItem>
                                                <Button className="remove-btn" color="danger" size="sm" onClick={this.onDeleteClick(_id)}>
                                                    &times;
                                                </Button>
                                                {name}
                                            </ListGroupItem>
                                        </CSSTransition>
                                    ))
                                }
                            </TransitionGroup>
                        </ListGroup>
                    })()
                }
            </Container>
        )
    }

}

ShoppingList.propTypes = {
    getItems: PropTypes["func"].isRequired,
    itemReducer: PropTypes["object"].isRequired
};

const mapStateToProps = state => ({
    itemReducer: state.itemReducer
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);