import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { like, remove } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Panel, Table } from 'react-bootstrap'

class BlogList extends React.Component {
    
    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <h2>blogs</h2>
                </Panel.Heading>
                <Panel.Body>
                    <Table hover>
                        <tbody>
                            {this.props.blogs.map(blog => 
                                <Blog 
                                    key={blog._id} 
                                    blog={blog} 
                                />
                            )}
                        </tbody>
                    </Table>
                </Panel.Body>
            </Panel>
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