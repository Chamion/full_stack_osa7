import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const getOne = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    getOne
}