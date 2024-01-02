import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import { Navigate, useNavigate } from 'react-router-dom'
import { AUTH_TOKEN } from '../constants'

const USER_QUERY = gql`
query GetUser{
    me {
        firstName
        lastName
        username
    }
}
`
export default function Account() {
    const navigate = useNavigate()
    const {data, error} = useQuery(USER_QUERY)
    if(error) {
        return (<div><p>{error.message}</p></div>)
    }
    const [username, setUsername] = useState('')
    useEffect(() => {
        data && setUsername(data.me.username)
    }, [data])
    return (
        <div className="flex flex-col space-y-4 items-center">
            <div>
                {
                    data && (

                        <div className="w-full flex flex-col items-center space-y-3">
                        <p><BsPersonCircle className="text-[150px]"/></p>
                        <p className="font-bold text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text">{data.me.firstName} {data.me.lastName}</p>
                        <p>@{data.me.username}</p>
                        <button className="bg-gray-800 px-3 py-1 rounded-md font-bold" onClick={() => {
                            localStorage.removeItem(AUTH_TOKEN)
                            navigate("/")
                        }}>Logout</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}