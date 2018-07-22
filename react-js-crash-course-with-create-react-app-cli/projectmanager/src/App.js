import React, { Component } from 'react';
import * as UUID from "uuid";
import $ from 'jquery';

// import logo from './logo.svg';
import './App.css';

import Projects from './components/Projects';
import AddProject from "./components/AddProject";
import Todos from './components/Todos';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };

        this.addProject = this.addProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    getTodos() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({
                    todos: data
                }, function () {
                    console.log(this.state)
                })
            }.bind(this),
            error: (xhr, status, err) => {
                console.log(xhr + status + err)
            }
        })
    }

    getProjects() {
        this.setState({
            projects: [
                {
                    id: UUID.v4(),
                    title: 'Business Website',
                    category: 'Web Design'
                },
                {
                    id: UUID.v4(),
                    title: 'Social App',
                    category: 'Mobile Development'
                },
                {
                    id: UUID.v4(),
                    title: 'E-commerce Shopping Cart',
                    category: 'Web Development'
                }
            ]
        });
    }

    componentWillMount() {
        this.getProjects();
        this.getTodos();
    }

    componentDidMount() {
        this.getTodos();
    }

    render() {
        return (
            <div className="App">
                {/*<header className="App-header">*/}
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                {/*<h1 className="App-title">Welcome to React</h1>*/}
                {/*</header>*/}
                {/*<p className="App-intro">*/}
                {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}

                <AddProject addProject={this.addProject}/>

                <Projects projects={this.state.projects} onDelete={this.deleteProject}/>

                <hr/>

                <Todos todos={this.state.todos}/>

            </div>
        );
    }

    addProject(newProject) {
        console.log(newProject);
        let projects = this.state.projects;
        projects.push(newProject);
        this.setState({
            projects: projects
        })
    }

    deleteProject(id) {
        let projects = this.state.projects.filter( project => project.id !== id);
        this.setState({
            projects: projects
        })
    }

}

export default App;
