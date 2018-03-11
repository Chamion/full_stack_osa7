import loginService from '../services/login'

const reducer = (store = null, action) => {
    if(action.type === 'LOGOUT') {
        window.localStorage.removeItem('loggedBlogAppUser')
        return null
    }
    if(action.type === 'LOGIN') {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(action.user))
        return action.user
    }
    return store
}

export const login = (username, password) => async (dispatch) => {
    const user = await loginService.login({
        username,
        password
    })
    dispatch({
        type: 'LOGIN',
        user
    })
}

export const logout = () => (dispatch) => {
    dispatch({
        type: 'LOGOUT'
    })
}

export const resume = (user) => (dispatch) => {
    dispatch({
        type: 'LOGIN',
        user
    })
}

export default reducer