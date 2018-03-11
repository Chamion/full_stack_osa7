import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { like, remove } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

class BlogList extends React.Component {
    
    render() {
        return (
            <div>
                <h2>blogs</h2>
                {this.props.blogs.map(blog => 
                    <Blog 
                        key={blog._id} 
                        blog={blog} 
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