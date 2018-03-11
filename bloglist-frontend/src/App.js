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
    this.notify(`blog '${blog.title}' by ${blog.author} added`)
  }

  logout = () => {
    this.props.logout()
    this.notify('logged out')
  }

    login = async (event) => {
        event.preventDefault()
        try {
            await this.props.login(this.state.username, this.state.password)
            this.notify('welcome back!')
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
                <h1>Bloglist users</h1>
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
            <div>
                <h2>Kirjaudu sovellukseen</h2>
                <form onSubmit={this.login}>
                    <div>
                        käyttäjätunnus
                        <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleLoginChange}
                        />
                    </div>
                    <div>
                        salasana
                        <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleLoginChange}
                        />
                    </div>
                    <button type="submit">kirjaudu</button>
                </form>
            </div>
        )
    }
    
    renderLogoutForm() {
        return (
            <div>
                {this.props.user.name} logged in <button onClick={this.logout}>logout</button>
            </div>
        )
    }
    
    renderNav() {
        return (
            <nav>
                <Link to='/'>blogs</Link>
                <span>  </span>
                <Link to='/users/'>users</Link>
            </nav>
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