const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Tämä on tietoturvan kannalta kehno idea.
usersRouter.get('/', async (request, response) => {
    var users = await User.find({}).populate('blogs', { _id: 1, title: 1, author: 1, url: 1, likes: 1})
    users = users.map(u => {
        return {
            _id: u._id,
            username: u.username,
            name: u.name,
            minor: u.minor,
            blogs: u.blogs
        }
    })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        if(typeof body.password !== 'string') {
            response.status(400).json({error: 'Missing or malformed argument password'})
            return
        } else if(body.password.length < 3) {
            response.status(400).json({error: 'Password is too short'})
            return
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        if(exception.name === 'BulkWriteError') {
                response.status(400).json({ error: 'Username is unavailable.' })
                return
        }
        response.status(500).json({ error: 'something went wrong...' })
    }
})

usersRouter.get('/:id', async (request, response) => {
    var users
    try {
        users = await User.find({'_id': request.params.id}).populate('blogs', { _id: 1, title: 1, author: 1, url: 1, likes: 1})
    } catch(err) {
        response.status(404).json({ error: 'Could not find user with given id.' })
    }
    if(users.length <= 0) {
        response.status(404).json({ error: 'Could not find user with given id.' })
    }
    const user = {
        _id: users[0]._id,
        username: users[0].username,
        name: users[0].name,
        minor: users[0].minor,
        blogs: users[0].blogs
    }
    response.json(user)
})

module.exports = usersRouter
