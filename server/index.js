import express from 'express'
import cors from 'cors'
import session from 'express-session'
import posts from './controller/posts.js'
import users from './controller/users.js'
import comments from './controller/comments.js'
import Orders from './model/orders.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.use(express.urlencoded({ extended: true }))

app.set('trust proxy', 1)

app.use(session({
    secret: 'labai ilgas kodas',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 6000000
    }
}))

app.use('/api/posts/', posts)

app.use('/api/users/', users)

app.use('/api/comments/', comments)

app.use('/api/orders/', Orders)

app.listen(3000)