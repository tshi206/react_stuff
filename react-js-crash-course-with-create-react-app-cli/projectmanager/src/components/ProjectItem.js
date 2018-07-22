import React from  'react';
import PropTypes from 'prop-types';

export default class ProjectItem extends React.Component {

    constructor(props) {
        super(props);

        this.deleteProject = this.deleteProject.bind(this);
    }

    render() {
        console.log(this.props);
        // noinspection JSUnresolvedVariable
        return(
            <li className="Project">

                <strong>{this.props.project.title}</strong> - {this.props.project.category}

                <button onClick={this.deleteProject}> X </button>

            </li>
        );
    }

    deleteProject() {
        // noinspection JSUnresolvedVariable
        console.log(this.props.project.id);
        // noinspection JSUnresolvedVariable
        this.props.onDelete(this.props.project.id);
    }

}

ProjectItem.propTypes = {
    project: PropTypes.object,
    deleteProject: PropTypes.func
};