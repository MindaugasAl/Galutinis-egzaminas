import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../MainContext'

const Login = () => {
    const { setLoggedIn, setUserInfo } = useContext(MainContext)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/users/login/', form)
            .then(resp => {
                setLoggedIn(true)
                setUserInfo(resp.data.user)
                setAlert({
                    message: resp.data.message,
                    status: 'success'
                })

                setTimeout(() => {
                    if (resp.data.user.role === 1)
                        return navigate('/admin')

                    navigate('/')
                }, 1000)
            })
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    }

    return (
        <div className="container">
            <h1>Prisijungimas</h1>
            {alert.message && (
                <div className={'alert alert-' + alert.status}>
                    {alert.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label className="mb-1">El. pašto adresas:</label>
                    <input type="email" name="email" className="form-control" onChange={handleForm} placeholder="Įveskite savo el., pšt., adresą" />
                </div>
                <div className="form-group mb-3">
                    <label className="mb-1">Slaptažodis:</label>
                    <input type="password" name="password" className="form-control" onChange={handleForm} placeholder="Įveskite savo slaptažodį" />
                </div>
                <button className="btn btn-primary">Prisijungti</button>
            </form>
        </div>
    )
}

export default Login