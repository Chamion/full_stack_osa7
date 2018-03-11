import React from 'react'
import { connect } from 'react-redux'
import usersService from '../services/users'

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
                        <div>
                            <span>{user.name}</span>
                            <span> | </span>
                            <span>{user.blogs.length}</span>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default connect()(UsersList)