import { useContext } from 'react'
import { Link } from 'react-router-dom'
import MainContext from '../../MainContext'

const Header = () => {
    const { loggedIn, userInfo } = useContext(MainContext)

    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">

                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <h2 className="fs-4">Knygų biblioteka</h2>
                </Link>

                <div className="d-flex align-items-center">
                    {loggedIn &&
                        <em style={{ fontSize: '.8rem', marginRight: '1rem' }}>
                            Sveiki, {userInfo.first_name + ' ' + userInfo.last_name}
                        </em>
                    }
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" aria-current="page">Titulinis</Link>
                        </li>
                        {loggedIn && userInfo.role === 1 &&
                            <>
                                <li className="nav-item">
                                    <Link to="/admin"
                                        className="nav-link"
                                        aria-current="page">Administratorius</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/new-post"
                                        className="nav-link"
                                        aria-current="page">Naujas Straipsnis</Link>
                                </li>
                            </>
                        }
                        {loggedIn ? (
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link" aria-current="page">Atsijungti</Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link" aria-current="page">Registruotis</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link" aria-current="page">Prisijungti</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </header>
        </div>

    )
}

export default Header