import React from  'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';

export default class Projects extends React.Component {

    render() {
        console.log(this.props);

        let projectItems;
        if (this.props.projects) {
            projectItems = this.props.projects.map( project => {
                console.log(project);
                return (
                    <ProjectItem onDelete={this.onDelete.bind(this)} project={project} key={project.id}/>
                )
            })
        }

        return(
            <div className="Projects">

                <h3>Latest projects</h3>
                <ul>
                    {projectItems}
                </ul>

            </div>
        );
    }

    onDelete(id) {
        this.props.onDelete(id);
    }

}

// type checker
Projects.propTypes = {
    projects: PropTypes.array,
    onDelete: PropTypes.func
};