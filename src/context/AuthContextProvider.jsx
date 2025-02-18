import { createContext, useEffect, useState } from "react"


export const authContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [token, setToken] = useState(null)
    useEffect(function () {
        if (localStorage.getItem('tkn')) {
            setToken(localStorage.getItem('tkn'))
        }
    }, [])

    return (
        <>
            <authContext.Provider value={{ token, setToken }}>
                {children}
            </authContext.Provider>
        </>
    )
}

export default AuthContextProvider
