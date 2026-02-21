import { useState, useRef } from "react"
import api from "../api/axiosConfig"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Top = () => {
    const [users, setUsers] = useState([])
    const [balance, setBalance] = useState()
    const timerRef = useRef(null)
    const navigate = useNavigate()

    const debouncedFn = (e) => {
        const value = e.target.value

        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            searchHandler(value)
        }, 500)
    }

    const searchHandler = async (value) => {
        try {
            const res = await api.get(`/user/bulk?filter=${value}`)
            setUsers(res.data.users)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const allUsers = async ()=>{
            try {
                const res = await api.get(`/user/bulk`)
                setUsers(res.data.users)
            } catch (error) {
                console.log(error)
            }
        }
        allUsers()
    },[])

    useEffect(()=>{
        const getBalance = async()=>{
            try {
                const res = await api.get('/account/balance')
                setBalance(res.data.balance)
            } catch (error) {
                console.log(error)
            }
        }

        getBalance()
    }, [balance])

    return (
        <div className="h-50 w-screen flex flex-col gap-6 px-10 py-5">
            <h1 className="text-xl">Your Balance - <span className="font-bold"> Rs. {balance ? balance.toFixed(2) : <>Loading...</>}</span></h1>
            <h1 className="text-lg font-semibold">Users</h1>

            <input
                onChange={debouncedFn}
                type="text"
                placeholder="Search Users"
                className="border p-2 rounded"
            />

            <div className="flex flex-col gap-2">
                {users.length > 0 ?  users.map((user) => (
                    <div
                        key={user._id}
                        className="border p-2 rounded shadow-sm py-5 flex justify-between"
                    >   <div>
                            {user.firstName} {user.lastName}
                        </div>
                        <button onClick={()=>navigate('/send', {
                            state :{data : user._id}
                        })} className="bg-gray-700 cursor-pointer text-white rounded px-4 py-2">Send Money</button>
                    </div>
                )) : (<div>No users</div>)}
            </div>
        </div>
    )
}

export default Top