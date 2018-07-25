import React from 'react';
import { connect } from 'react-redux';
import { createPosts } from "../actions/PostActions";

class PostForm extends React.Component {

    state = {
        title: "",
        body: "",
    };

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value})
    };

    onSubmit = e => {
        e.preventDefault();
        const post = {
            title: this.state.title,
            body: this.state.body
        };
        this.props.createPosts(post)
    };

    render() {
        return (
            <div>
                <h1>Add Post</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Title: <br/>
                            <input type="text" name="title" value={this.state.title} onChange={this.onChange} />
                        </label>
                    </div>
                    <br/>
                    <div>
                        <label>Body: <br/>
                            <textarea name="body" value={this.state.body} onChange={this.onChange} />
                        </label>
                    </div>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
                <hr/>
            </div>
        );
    }

}

export default connect(null, { createPosts })(PostForm);