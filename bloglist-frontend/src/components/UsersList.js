import React from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'

class UsersList extends React.Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
        this.getUsersFromServer()
    }
    
    getUsersFromServer = async () => {
        const users = await usersService.getAll()
        this.setState({
            users
        })
    }
    
    render() {
        return (
            <div>
                <span>name | blogs added</span>
                {this.state.users.map(user => {
                    return (
                        <div key={user._id}>
                            <Link to={`/users/${user._id}`}>{user.name}</Link>
                            <span> | </span>
                            <span>{user.blogs.length}</span>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default UsersList