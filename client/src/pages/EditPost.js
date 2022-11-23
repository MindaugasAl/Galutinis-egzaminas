import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditPost = () => {
    const { id } = useParams()

    const [post, setPost] = useState({
        title: '',
        content: '',
        image: ''
    })

    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/posts/' + id)
            .then(resp => {
                if (!resp.data) {
                    navigate('/')
                    return
                }

                setPost(resp.data)
            })
            .catch(error => {
                console.log(error)
                navigate('/')
            })
    }, [id, navigate])

    const handleForm = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/posts/edit/' + id, post)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })

                window.scrollTo(0, 0)

                setTimeout(() => navigate('/'), 2000)
            })
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
                window.scrollTo(0, 0)

                if (error.response.status === 401)
                    setTimeout(() => navigate('/login'), 2000)
            })

    }

    return (
        <div className="container">
            <h2>Įrašo redagavimas</h2>
            {alert.message && (
                <div className={'alert alert-' + alert.status}>
                    {alert.message}
                </div>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-2">
                    <label>Pavadinimas:</label>
                    <input type="text" name="title" className="form-control" onChange={(e) => handleForm(e)} value={post.title} />
                </div>
                <div className="form-group mb-2">
                    <label>Knygos aprašymas:</label>
                    <textarea name="content" className="form-control" onChange={(e) => handleForm(e)} value={post.content} style={{ minHeight: 250, resize: 'none' }}></textarea>
                </div>
                <div className="form-group mb-2">
                    <label>Kategorija:</label>
                    <input type="text" name="category" className="form-control" onChange={(e) => handleForm(e)} value={post.category} />
                </div>
                <div className="form-group mb-2">
                    <label>Nuotrauka:</label>
                    <input type="text" name="image" className="form-control" onChange={(e) => handleForm(e)} value={post.image} />
                </div>
                <div className="form-group mb-2">
                    <img src={post.image} alt={post.title} style={{ maxWidth: 150 }} />
                </div>
                <button className="btn btn-primary">Siųsti</button>
            </form>
        </div>
    )
}

export default EditPost