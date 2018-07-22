import React from  'react';
import * as UUID from "uuid";
import PropTypes from "prop-types";

export default class AddProject extends React.Component {

    static defaultProps = {
        categories: [
            'Web Design', 'Web Development', 'Mobile Development'
        ]
    };


    constructor(props) {
        super(props);

        this.inputRef = React.createRef();
        this.categoryRef = React.createRef();

        this.state = {
            newProject: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {

        let categoryOptions = this.props.categories.map( category => {
            return <option key={category} value={category}>{category}</option>
        } );

        return(
            <div>

                <h3>Add project</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Title</label> <br/>
                        <input type="text" ref={this.inputRef} required />
                    </div>
                    <div>
                        <label>Category</label> <br/>
                        <select ref={this.categoryRef}>
                            {categoryOptions}
                        </select>
                    </div> <br/>
                    <input type="submit" value="Submit" /> <br/>
                </form>

            </div>
        );
    }

    handleSubmit (e) {
        e.preventDefault();
        if (this.inputRef.current.value) {
            console.log(this.inputRef.current.value);
            console.log(this.categoryRef.current.value);
            this.setState({
                newProject: {
                    id: UUID.v4(),
                    title: this.inputRef.current.value,
                    category: this.categoryRef.current.value
                }
            }, () => {
                console.log(this.state);
                this.props.addProject(this.state.newProject);
            })
        }
    }

}

AddProject.propTypes = {
    category: PropTypes.array,
    handleSubmit: PropTypes.func
};