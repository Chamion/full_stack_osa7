import React from 'react'
import usersService from '../services/users'

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: '',
                name: '',
                minor: false,
                blogs: []
            }
        }
        this.getUserFromServer(props.id)
    }
    
    getUserFromServer = async (id) => {
        const user = await usersService.getOne(id)
        this.setState({
            user
        })
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.user.name}</h1>
                <div>
                    <h2>Added blogs</h2>
                    {this.state.user.blogs.map(blog => {
                        return (
                            <div key={blog._id}>
                                <span>{blog.title}</span>
                                <span> by </span>
                                <span>{blog.author}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default UserInfo