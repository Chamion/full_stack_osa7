import React from 'react'
import usersService from '../services/users'
import { Panel, Table } from 'react-bootstrap'

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
            <Panel>
                <Panel.Heading>
                    <h2>{this.state.user.name}</h2>
                </Panel.Heading>
                <Panel.Body>
                    <h3>Added blogs</h3>
                    <Table bordered>
                        <tbody>
                            {this.state.user.blogs.map(blog => {
                                return (
                                    <tr key={blog._id}>
                                        <td>
                                            <span>{blog.title}</span>
                                            <span> by </span>
                                            <span>{blog.author}</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Panel.Body>
            </Panel>
        )
    }
}

export default UserInfo