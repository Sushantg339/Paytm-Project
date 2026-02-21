import { useEffect, useState } from "react"
import api from "../api/axiosConfig"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const res = await api.get("/user")
            setUser(res.data.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
        }

        fetchUser()
    }, [])

    if (loading) return <div>Loading...</div>

    return user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoutes