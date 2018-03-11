import React from 'react'
import { Link } from 'react-router-dom'

class Blog extends React.Component {
  render() {

    return (
      <tr>
        <td>
            <Link to={`/blogs/${this.props.blog._id}`}>
              {this.props.blog.title} by {this.props.blog.author}
            </Link>
        </td>
      </tr>
    )
  }
}

export default Blog