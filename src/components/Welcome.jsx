import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs'


const USER_QUERY = gql`
query GetUser{
    me {
        firstName
        lastName
    }
}
`
export default function Welcome() {
    const {data, error} = useQuery(USER_QUERY)
    if(error) {
        return (<div><p>{error.message}</p></div>)
    }
    const [username, setUsername] = useState('')
    useEffect(() => {
        data && setUsername(`${data.me.firstName} ${data.me.lastName}`)
    }, [data])
    return (
        <div className="flex flex-col space-y-4 items-center">
            <div>
                {
                    data && (
                        <p className="font-bold text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text">WELCOME BACK {username.toUpperCase()}</p>
                    )
                }
            </div>
        </div>
    )
}