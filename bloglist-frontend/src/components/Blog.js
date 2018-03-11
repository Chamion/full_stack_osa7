import React from 'react'
import { Link } from 'react-router-dom'

class Blog extends React.Component {
  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <Link to={`/blogs/${this.props.blog._id}`}>
          {this.props.blog.title} by {this.props.blog.author}
        </Link>
      </div>
    )
  }
}

export default Blog