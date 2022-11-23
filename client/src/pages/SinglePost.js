import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../MainContext'

const SinglePost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({})
    const [comment, setComment] = useState('')
    const { loggedIn } = useContext(MainContext)
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get('/api/posts/' + id)
            .then(resp => {
                if (!resp.data) {
                    navigate('/')
                    return
                }

                setPost(resp.data)
            })
            .catch((error) => {
                console.log(error)
                navigate('/')
            })
    }, [id, navigate, refresh])

    const handleForm = (e) => {
        e.preventDefault()

        axios.post('/api/comments/', { comment, postId: id })
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })
                setComment('')

                setRefresh(!refresh)

                setTimeout(() => setAlert({
                    message: '',
                    status: ''
                }), 2000)
            })
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })

                if (error.response.status === 401)
                    setTimeout(() => navigate('/login'), 2000)
            })
    }

    return (
        <div className="mb-5 container">
            <div className="single-post">
                <h1>{post.title}</h1>
                <h6>{post.category}</h6>
                <div className="image" style={{ backgroundImage: 'url(' + post.image + ')' }}></div>
                <div className="content">
                    {post.content}
                </div>
                {post.comments &&
                    <div className="mt-3 comments">
                        <h3 className="mb-4">Vartotojų komentarai</h3>
                        {post.comments.map(entry =>
                            <div key={entry.id} className="pb-3 mb-3 border-bottom comment" style={{ borderColor: 'grey' }}>
                                <div className="user mb-2">
                                    <strong className="date d-block">{entry.user.first_name + ' ' + entry.user.last_name}</strong>
                                    <em className="user-name">{new Date(entry.createdAt).toLocaleString('lt-LT')}</em>
                                </div>
                                <div style={{ whiteSpace: "pre-line" }}>
                                    {entry.comment}
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
            {loggedIn ?
                <div className="mt-5 comment-form">
                    <h2>Palikite savo komentarą</h2>
                    {alert.message && (
                        <div className={'my-2 alert alert-' + alert.status}>
                            {alert.message}
                        </div>
                    )}
                    <form onSubmit={(e) => handleForm(e)}>
                        <div className="form-group mb-2">
                            <label>Jūsų komentaras:</label>
                            <textarea
                                className="form-control"
                                name="comment"
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-group mb-2">
                            <button className="btn btn-primary">Siųsti</button>
                        </div>
                    </form>
                </div>
                :
                <div className="mt-5">Prisijunkite norėdami palikti komentarą</div>
            }
        </div>
    )
}

export default SinglePost