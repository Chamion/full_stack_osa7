import React from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersList from './components/UsersList'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import { showNotification } from './reducers/notificationReducer'
import { initBlogs, add } from './reducers/blogReducer'
import { login, logout, resume } from './reducers/userReducer'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap3/dist/css/bootstrap.css'
import 'bootstrap3/dist/css/bootstrap-theme.css'
import { Navbar, Nav, Panel, Form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: '',
      password: '', 
      title: '',
      author: '',
      url: ''
    }
  }

  componentWillMount() {
    this.props.initBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.resume(user)
    }
  } 

  notify = (message, type = 'info') => {
    this.props.showNotification(message, type, 5)
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
    }
    
    await this.props.add(blog)
    this.setState({
        title: '',
        author: '',
        url: '',
    })
    this.notify(`blogi '${blog.title}' kirjoittajalta ${blog.author} lisätty`)
  }

  logout = () => {
    this.props.logout()
    this.notify('sinut on kirjattu ulos')
  }

    login = async (event) => {
        event.preventDefault()
        try {
            await this.props.login(this.state.username, this.state.password)
            this.notify('Tervetuloa takaisin!')
            this.setState({ username: '', password: ''})
        } catch (exception) {
            this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
        }
    }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

    renderHome() {
        if (this.props.user === null) {
          return (
            <div>
            </div>
          )
        }

        return (
          <div>
            <Togglable buttonLabel='uusi blogi'>
              <BlogForm 
                handleChange={this.handleLoginChange}
                title={this.state.title}
                author={this.state.author}
                url={this.state.url}
                handleSubmit={this.addBlog}
              />
            </Togglable>

            <BlogList />
          </div>
        );
    }
    
    renderUsers() {
        return (
            <div>
                <UsersList />
            </div>
        )
    }
    
    renderUserInfo(id) {
        return (
            <div>
                <UserInfo id={id} />
            </div>
        )
    }
    
    renderBlogInfo(id) {
        return (
            <div>
                <BlogInfo id={id} />
            </div>
        )
    }
    
    renderLoginForm() {
        return (
            <Panel>
                <Panel.Heading>
                    <h2>Kirjaudu sovellukseen</h2>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal onSubmit={this.login}>
                        <FormGroup>
                            <Col sm={2}>
                                <ControlLabel>
                                    käyttäjätunnus
                                </ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleLoginChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2}>
                                <ControlLabel>
                                    salasana
                                </ControlLabel>
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleLoginChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2}>
                                <FormControl type="submit" className='btn btn-primary' value='kirjaudu' />
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
        )
    }
    
    renderLogoutForm() {
        return (
            <Panel>
                <Panel.Body>
                    Olet kirjautunut käyttäjänä {this.props.user.name} <button onClick={this.logout} className='btn btn-default'>kirjaudu ulos</button>
                </Panel.Body>
            </Panel>
        )
    }
    
    renderNav() {
        return (
            <Navbar>
                <div className='container-fluid'>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <h1 style={{margin: 0}}>Blogilista</h1>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <li><Link to='/'>blogit</Link></li>
                        <li><Link to='/users/'>käyttäjät</Link></li>
                    </Nav>
                </div>
            </Navbar>
        )
    }
    
    render() {
        var userForm
        if (this.props.user === null) {
            userForm = this.renderLoginForm()
        } else {
            userForm = this.renderLogoutForm()
        }
        const nav = this.renderNav()
        return (
            <div>
                <Router>
                    <div>
                        {nav}
                        <Notification />
                        {userForm}
                        <Route exact path='/' render={() => this.renderHome()} />
                        <Route exact path='/users/' render={() => this.renderUsers()} />
                        <Route path='/users/:id' render={({match}) => this.renderUserInfo(match.params.id)} />
                        <Route path='/blogs/:id' render={({match}) => this.renderBlogInfo(match.params.id)} />
                    </div>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    {
        showNotification,
        initBlogs,
        add,
        login,
        logout,
        resume
    }
)(App);