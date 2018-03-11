import blogService from '../services/blogs'

const reducer = (store = [], action) => {
    if(action.type === 'INIT_BLOGS') {
        return action.blogs
    }
    if(action.type === 'LIKE') {
        const liked = store.find(b=>b._id===action.id)
        const updated = { ...liked, likes: liked.likes + 1 }
        blogService.update(action.id, updated)
        return store.map(b => b._id === action.id ? updated : b)
    }
    if(action.type === 'REMOVE') {
        blogService.remove(action.id)
        return store.filter(b=>b._id!==action.id)
    }
    if(action.type === 'ADD') {
        return store.concat(action.result)
    }
    if(action.type === 'LOGIN') {
        blogService.setToken(action.user.token)
    }
    return store
}

export const initBlogs = () => async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
        type: 'INIT_BLOGS',
        blogs
    })
}

export const like = (id) => (dispatch) => {
    dispatch({
        type: 'LIKE',
        id
    })
}

export const remove = (id) => (dispatch) => {
    dispatch({
        type: 'REMOVE',
        id
    })
}

export const add = (blog) => async (dispatch) => {
    const result = await blogService.create(blog)
    dispatch({
        type: 'ADD',
        result
    })
}

export default reducer