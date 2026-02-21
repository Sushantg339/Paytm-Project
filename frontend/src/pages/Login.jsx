import { useForm } from "react-hook-form"
import api from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm()

    const navigate = useNavigate()

    const loginHandler = async (data) => {
        try {
            const res = await api.post("/user/signin", data)
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
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Login to your account</p>
                </div>

                <form onSubmit={handleSubmit(loginHandler)} className="space-y-4">
            
                    <div>
                        <input
                        {...register("username", { required: true })}
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.username && (
                        <p className="text-red-500 text-sm mt-1">Email is required</p>
                        )}
                    </div>

            
                    <div>
                        <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.password && (
                        <p className="text-red-500 text-sm mt-1">Password is required</p>
                        )}
                    </div>

            
                    <button
                        type="submit"
                        className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                    >Sign In</button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-500 cursor-pointer hover:underline"
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login