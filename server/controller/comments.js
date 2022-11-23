import express from 'express'
import { auth } from '../middleware/auth.js'
import { commentsValidator } from '../middleware/validate.js'
import db from '../database/connect.js'

const Router = express.Router()

Router.post('/', auth, commentsValidator, async (req, res) => {
    try {
        req.body.userId = req.session.user.id
        await db.Comments.create(req.body)
        res.send('Jūsų komentaras sėkmingai išsaugotas')
    } catch (error) {
        console.log(error)
        res.status(500).send('Nepavvyko išsaugoti komentaro')
    }
})

export default Router