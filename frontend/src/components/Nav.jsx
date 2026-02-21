import { useEffect } from "react"
import { useState } from "react"
import api from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"

const Nav = () => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
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
    return (
        <nav className="h-15 w-screen flex items-center justify-between px-10 border-b border-gray-400 py-10">
            <div>
                <h1 className="text-3xl font-bold">
                    Payments App
                </h1>
            </div>
            <div className="flex gap-3 items-center justify-center">
                {!loading && user && (
                    <>
                        <span>Hello, {user.firstName}</span>

                        <div
                            onClick={() => navigate("/update")}
                            className="h-12 w-12 rounded-full bg-gray-400 cursor-pointer flex items-center justify-center text-blue-500"
                        >
                            {user.firstName?.charAt(0).toUpperCase()}
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav