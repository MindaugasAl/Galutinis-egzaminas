import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../MainContext'

const Logout = () => {
    const { setLoggedIn, setUserInfo } = useContext(MainContext)

    const navigate = useNavigate()
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

    useEffect(() => {
        axios.get('/api/users/logout')
            .then(resp => {
                setLoggedIn(false)
                setUserInfo({})
                setAlert({
                    message: resp.data,
                    status: 'success'
                })
                setTimeout(() => navigate('/'), 2000)
            })
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
                setTimeout(() => navigate('/'), 2000)
            })
    }, [navigate, setLoggedIn, setUserInfo])

    return alert.message && (
        <div className="container">
            <div className={'alert alert-' + alert.status}>
                {alert.message}
            </div>
        </div>
    )
}

export default Logout