import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { like, remove } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

class BlogList extends React.Component {
    removeBlog(blog) {
        const ok = window.confirm(`remove blog '${blog.title}' by ${blog.author}?`)
        if ( ok===false) {
            return
        }
        this.props.showNotification(`blog '${blog.title}' by ${blog.author} removed`, 'info', 5)
        this.props.remove(blog._id)
    }
    
    likeBlog(blog) {
        this.props.showNotification(`You liked '${blog.title}' by ${blog.author}`, 'info', 5)
        this.props.like(blog._id)
    }
    
    render() {
        return (
            <div>
                <h2>blogs</h2>
                {this.props.blogs.map(blog => 
                    <Blog 
                        key={blog._id} 
                        blog={blog} 
                        like={() => this.likeBlog(blog)}
                        remove={() => this.removeBlog(blog)}
                        deletable={blog.user === undefined || blog.user.username === this.props.user.username}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const byLikes = (b1, b2) => b2.likes - b1.likes
    const blogsInOrder = state.blogs.sort(byLikes)
    return {
        blogs: blogsInOrder,
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    {
        like,
        remove,
        showNotification
    }
)(BlogList)