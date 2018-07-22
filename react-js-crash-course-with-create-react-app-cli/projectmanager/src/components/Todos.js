import React from  'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

export default class Todos extends React.Component {

    render() {

        let todoItems;
        if (this.props.todos) {
            todoItems = this.props.todos.map( todo => {
                return (
                    <TodoItem todo={todo} key={todo.id}/>
                )
            })
        }

        return(
            <div className="Todos">

                <h3>Todo Lists</h3>
                <ul>
                    {todoItems}
                </ul>

            </div>
        );
    }

}

// type checker
Todos.propTypes = {
    todos: PropTypes.array
};