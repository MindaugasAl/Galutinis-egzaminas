import { createContext } from 'react'

const MainContext = createContext({
    // alert: '',
    // setAlert: () => {},
    loggedIn: false,
    setLoggedIn: () => {},
    userInfo: {},
    setUserInfo: () => {}
})

export default MainContext