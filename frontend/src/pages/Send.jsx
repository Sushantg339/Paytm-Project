import { useForm } from "react-hook-form"
import api from "../api/axiosConfig"
import { useLocation, useNavigate } from "react-router-dom"

const Send = () => {
    const location = useLocation()
    const userId = location.state?.data
    const navigate = useNavigate()
    const {register, handleSubmit, reset, formState : {errors}} = useForm()

    const sendhandler = async(data)=>{
        try {
            const res = await api.post('/account/transfer', data)
            console.log(res)
            navigate('/')
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

                <form onSubmit={handleSubmit(sendhandler)} className="space-y-4">
            
                    <div>
                        <input
                        {...register("to", { required: true })}
                        type="text"
                        readOnly
                        placeholder="UserId"
                        value={userId}
                        autoComplete="off"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.username && (
                        <p className="text-red-500 text-sm mt-1">Email is required</p>
                        )}
                    </div>

            
                    <div>
                        <input
                            {...register("amount", { required: true , valueAsNumber: true})}
                            type="number"
                            placeholder="Amount"
                            autoComplete="off"
                            className="w-full px-4 py-2 border rounded-lg 
                                    focus:ring-2 focus:ring-blue-400 focus:outline-none
                                    [appearance:textfield]"
                        />

                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">
                            Amount is required
                            </p>
                        )}
                    </div>

            
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                    >Send Money</button>
                </form>
            </div>
        </div>
    )
}

export default Send