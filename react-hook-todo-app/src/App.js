import React, { useState } from "react";
import "./App.css";

// useState allows using state in a functional component
const App = () => {
    // useState returns an array with 2 elements (i.e., a pair). The first element is the current value of the state (the value got passed in when first invoking the useState function) and the second element is a function which you can use to update the state value
    const [todos, setTodos] = useState([
        {
            text: "Learn about react",
            isCompleted: false
        },
        {
            text: "Eat burgers",
            isCompleted: false
        },
        {
            text: "Build cool apps",
            isCompleted: false
        },
        {
            text: "Drink beers",
            isCompleted: false
        },
        {
            text: "Sleep",
            isCompleted: false
        }
    ]);
    const addTodo = text => {
        // new array is defined as old array (using spread operator as a syntactical sugar), concatenated with a new element of type { String, Bool }
        const newTodos = [...todos,
            {
                text,
                isCompleted: false
            }
        ];
        setTodos(newTodos);
    };
    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos)
    };
    const deleteTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos)
    };
    return (
        <div className="app">
            <div className="todo-list">
                {todos.map((todo, index) => {
                    return (
                        <Todo key={index} index={index} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>
                    );
                })}
                <TodoForm addTodo={addTodo}/>
            </div>
        </div>
    )
};

const Todo = ({ todo, index, completeTodo, deleteTodo }) => {
    return (
        <div className="todo" itemID={index} style={{textDecoration: todo.isCompleted ? "line-through" : ""}}>
            <p>{ todo.text }</p>
            <div className="btns">
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button id="delete" onClick={() => deleteTodo(index)}>Delete</button>
            </div>
        </div>
    )
};

const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("")
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add Todo..."/>
        </form>
    )
};

export default App;