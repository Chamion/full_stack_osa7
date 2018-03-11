import React from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'
import { Panel, Col, Row } from 'react-bootstrap'

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
            <Panel>
                <Panel.Heading>
                    <h2>Blogilistan käyttäjät</h2>
                </Panel.Heading>
                <Panel.Body>
                    <Row>
                        <Col sm={3}></Col>
                        <Col sm={3}>blogeja lisätty</Col>
                    </Row>
                    {this.state.users.map(user => {
                        return (
                            <Row key={user._id}>
                                <Col sm={3}>
                                    <Link to={`/users/${user._id}`}>{user.name}</Link>
                                </Col>
                                <Col sm={3}>
                                    <span>{user.blogs.length}</span>
                                </Col>
                            </Row>
                        )
                    })}
                </Panel.Body>
            </Panel>
        )
    }
}

export default UsersList