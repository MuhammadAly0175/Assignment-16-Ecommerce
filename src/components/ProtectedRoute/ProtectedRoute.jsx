import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate()

    useEffect(function () {
        if (!localStorage.getItem('tkn')) {
            navigate('/login')
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute
