import React from 'react';
// connect this component to the store (Provider)
import { connect } from 'react-redux';
import {fetchPosts} from "../actions/PostActions";


class Posts extends React.Component {

    componentWillMount() {
        this.props.fetchPosts()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        nextProps.newPost.id = this.props.posts.length + 1;
        if (nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost)
        }
    }

    render() {
        console.log(this.props);
        const postItems = this.props.posts.map( p => (
            <div key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
            </div>
        ));
        return (
            <div>
                <h1>Posts</h1>
                {postItems}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Posts);