import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'
import Home from './pages/Home'
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

        </Route>
      </>
          }
    </Routes>
      </MainContext.Provider >
    </BrowserRouter >
  )
}

export default App;
