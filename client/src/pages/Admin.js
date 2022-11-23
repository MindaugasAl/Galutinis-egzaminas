import { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import convertDate from '../utils/Date'
import MainContext from '../MainContext'
import axios from 'axios'

const Admin = () => {
  const [posts, setPosts] = useState([])
  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [refresh, setRefresh] = useState(false)
  const { loggedIn } = useContext(MainContext)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/posts/')
      .then(resp => setPosts(resp.data))
      .catch(error => console.log(error))
  }, [refresh])

  const handleDelete = (id) => {
    if (isNaN(id) || !loggedIn)
      return

    axios.delete('/api/posts/delete/' + id)
      .then(resp => {
        setAlert({
          message: resp.data.message,
          status: 'success'
        })
        setRefresh(!refresh)

        window.scrollTo(0, 0)
      })
      .catch(error => {
        console.log(error)
        setAlert({
          message: error.response.data,
          status: 'danger'
        })
        window.scrollTo(0, 0)

        if (error.response.status === 401)
          setTimeout(() => navigate('/login'), 2000)
      })
      .finally(() => {
        setTimeout(() => setAlert({
          message: '',
          status: ''
        }), 3000)
      })

  }

  return (
    <div className="container">
      <h2>Administratorius</h2>
      {alert.message && (
        <div className={'alert alert-' + alert.status}>
          {alert.message}
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paveikslėlis</th>
            <th>Pavadinimas</th>
            <th>Kategorija</th>
            <th>Sukūrimo data</th>
            <th>Modifikavimo data</th>
            <th>Atlikti veiksmus</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post =>
            <tr key={post.id}>
              <td>{post.id}</td>
              <td className="image" style={{ backgroundImage: 'url(' + post.image + ')' }}></td>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td>{convertDate(post.createdAt)}</td>
              <td>{convertDate(post.updatedAt)}</td>
              <td>
                <Link
                  to={'/admin/edit/' + post.id}
                  className="btn btn-light">Redaguoti</Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="btn btn-light">Trinti</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Admin