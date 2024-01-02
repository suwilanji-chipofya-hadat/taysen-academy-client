import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { AUTH_TOKEN } from "../constants"


export default function Auth() {
    const [login, setLogin] = useState(true)
    const navigate = useNavigate()
    const authToken = localStorage.getItem(AUTH_TOKEN)
    
    useEffect(() => {
        if(!authToken) {
            navigate("/login")
        }
    }, [authToken])
    return (
        <div className="h-screen text-white">
            <Outlet/>
        </div>
    )
}