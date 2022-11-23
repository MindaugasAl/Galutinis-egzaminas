import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import NotFound from './pages/404'
import EditPost from './pages/EditPost'
import SinglePost from './pages/SinglePost'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Admin from './pages/Admin'
import Header from './components/Header/Header'
import MainContext from './MainContext'
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const contextValues = { loggedIn, setLoggedIn, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth/')
      .then(resp => {
        setLoggedIn(true)
        setUserInfo(resp.data)
      })
  }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
          {loggedIn && userInfo.role === 1 &&
            <>
              <Route path="/admin">
                <Route index element={<Admin />} />
                <Route path="new-post" element={<NewPost />} />
                <Route path="edit/:id" element={<EditPost />} />
              </Route>
            </>
          }
        </Routes>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App;
