import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NewPost = () => {
    const [postForm, setPostForm] = useState({
        title: '',
        content: '',
        image: ''
    })
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        setPostForm({ ...postForm, [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = new FormData()

        for (const key in postForm) {
            form.append(key, postForm[key])
        }

        axios.post('/api/posts/', form)
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
            <h1>Naujas straipnis</h1>
            {alert.message && (
                <div className={'alert alert-' + alert.status}>
                    {alert.message}
                </div>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-2">
                    <label className="mb-1">Pavadinimas:</label>
                    <input type="text" name="title" className="form-control" onChange={(e) => handleForm(e)} />
                </div>
                <div className="form-group mb-2">
                    <label className="mb-1">Kategorija:</label>
                    <input type="text" name="category" className="form-control" onChange={(e) => handleForm(e)} />
                </div>
                <div className="form-group mb-2">
                    <label className="mb-1">Knygos aprašymas:</label>
                    <textarea name="content" className="form-control" onChange={(e) => handleForm(e)}></textarea>
                </div>
                <div className="form-group mb-3">
                    <label className="mb-1">Nuotrauka:</label>
                    <input type="file" name="image" className="form-control" onChange={(e) => handleForm(e)} />
                </div>
                <button className="btn btn-primary">Siųsti</button>
            </form>
        </div>
    )
}

export default NewPost