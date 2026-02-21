import { useForm } from "react-hook-form"
import api from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

const UpdateProfile = () => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const { register, reset, formState: { errors }, handleSubmit } = useForm()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/user")
                reset({
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName || ""
                })
            } catch (err) {
                navigate("/login")
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [reset, navigate])


    const updateController = async (data) => {
        try {
            if(data.password.length === 0){
                data.password = undefined
            }
            const res = await api.put("/user", data)
            
            console.log(res)
            navigate("/")
            reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
            
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold text-gray-800">Update Profile</h1>
                </div>

                <form onSubmit={handleSubmit(updateController)} className="space-y-4">

                    <div>
                        <input
                        {...register("firstName", { required: true })}
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.username && (
                        <p className="text-red-500 text-sm mt-1">First Name is required</p>
                        )}
                    </div>

                    <div>
                        <input
                        {...register("lastName")}
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <input
                        {...register("password")}
                        type="password"
                        placeholder="New Password (optional)"
                        autoComplete="off"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

            
                    <button
                        type="submit"
                        className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                    >Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile