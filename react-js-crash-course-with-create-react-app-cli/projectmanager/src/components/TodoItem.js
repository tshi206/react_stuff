import React from  'react';
import PropTypes from 'prop-types';

export default class TodoItem extends React.Component {

    render() {
        // noinspection JSUnresolvedVariable
        return(
            <li className="Todo">

                <strong>{this.props.todo.title}</strong> - {this.props.todo.id}

            </li>
        );
    }

}

TodoItem.propTypes = {
    todo: PropTypes.object
};