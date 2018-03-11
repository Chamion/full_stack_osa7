import React from 'react'
import { connect } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Redirect } from 'react-router-dom'

class BlogInfo extends React.Component {
    
    likeBlog() {
        this.props.showNotification(`You liked '${this.props.blog.title}' by ${this.props.blog.author}`, 'info', 5)
        this.props.like(this.props.blog._id)
    }
    
    deleteBlog() {
        const ok = window.confirm(`remove blog '${this.props.blog.title}' by ${this.props.blog.author}?`)
        if ( ok===false) {
            return
        }
        this.props.remove(this.props.blog._id)
        this.props.showNotification(`blog '${this.props.blog.title}' by ${this.props.blog.author} removed`, 'info', 5)
    }
    
    render() {
        if(this.props.blog === undefined) {
            return (
                <Redirect to='/' />
            )
        }
        var deleteButton
        if(this.props.canDelete) {
            deleteButton = (
                <button onClick={() => this.deleteBlog()}>delete</button>
            )
        } else {
            var addedBy
            if(this.props.blog.user) {
                addedBy = (
                    <p>added by {this.props.blog.user.name}</p>
                )
            } else {
                addedBy = (
                    <p></p>
                )
            }
            deleteButton = addedBy
        }
        return (
            <div>
                <h1>{this.props.blog.title} {this.props.blog.author}</h1>
                <p><a href={this.props.blog.url}>{this.props.blog.url}</a></p>
                <p>{this.props.blog.likes} likes <button onClick={() => this.likeBlog()}>like</button></p>
                {deleteButton}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    var blog
    blog = state.blogs.find(b => b._id === ownProps.id)
    if(blog === undefined) {
        return {
            blog: undefined
        }
    }
    var canDelete = blog.user === undefined
    if(!canDelete) {
        if(blog.user.username) {
            if(blog.user.username === state.user.username) {
                canDelete = true
            }
        } else {
            canDelete = true
        }
    }
    return {
        blog,
        canDelete
    }
}

export default connect(
    mapStateToProps,
    {
        showNotification,
        like,
        remove
    }
)(BlogInfo)