import express from 'express'
import { Op } from 'sequelize'
import db from '../database/connect.js'
import { adminAuth } from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import { postValidator } from '../middleware/validate.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const options = {}

    if (req.query.order)
        options.order = [
            ['title', 'DESC']
        ]

    try {
        const posts = await db.Posts.findAll(options)
        res.json(posts)
    } catch {


        res.status(500).send('Įvyko serverio klaida')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id, {
            include: [
                {
                    model: db.Users,
                    attributes: { exclude: ['password', 'role', 'email', 'updatedAt', 'category'] }
                },
                {
                    model: db.Comments,
                    include: {
                        model: db.Users,
                        attributes: { exclude: ['password', 'role', 'email', 'updatedAt', 'category'] }
                    }
                }
            ],
            attributes: {
                exclude: ['postId', 'userId']
            }
        })
        res.json(post)
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

router.get('/userpost/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id, {
            include: db.Users
        })
        res.json(post)
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

router.get('/search/:keyword', async (req, res) => {
    try {
        const posts = await db.Posts.findAll({
            where: {
                title: {
                    [Op.like]: '%' + req.params.keyword + '%'
                }

            }
        })
        res.json(posts)
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})


router.post('/', adminAuth, upload.single('image'), postValidator, async (req, res) => {
    try {
        if (req.file)
            req.body.image = '/uploads/' + req.file.filename

        new db.Posts(req.body).save()
        res.send('Knyga sėkmingai įtraukta į sąrašus')
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

router.put('/edit/:id', adminAuth, upload.single('image'), postValidator, async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        post.update(req.body)
        res.send('Knygos duomenys sėkmingai atnaujinti')
    } catch {
        res.status(500).send('Nepavyko atnaujinti duomenų')
    }
})

router.delete('/delete/:id', adminAuth, async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        post.destroy()
        res.json({ message: 'Knyga sėkmingai ištrinta' })
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})


export default router