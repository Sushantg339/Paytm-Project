import { lazy } from "react"
import { Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes"
const Home = lazy(()=> import('../pages/Home'))
const Login = lazy(()=> import('../pages/Login'))
const Signup = lazy(()=> import('../pages/Signup'))
const UpdateProfile = lazy(()=> import('../pages/UpdateProfile'))
const Send = lazy(()=> import('../pages/Send'))
const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoutes>
                    <Home/>
                </ProtectedRoutes>
            }/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/update" element={
                <ProtectedRoutes>
                    <UpdateProfile/>
                </ProtectedRoutes>
            }/>
            <Route path="/send" element={
                <ProtectedRoutes>
                    <Send/>
                </ProtectedRoutes>
            }/>
        </Routes>
    )
}

export default MainRoutes