import { useState } from "react"
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
  ) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
export default function Login() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    username: '',
    password: ''
  })
  const [tokenAuth] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password
    },
    onCompleted: ({ tokenAuth }) => {
      localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
      window.location.replace("/");
    },
    onError: (error) => {
      console.log(error)
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault()
    tokenAuth()
    console.log(formState)
  }
  return (
    <div className="flex flex-col items-center w-full min-h-[300px] justify-center space-y-5">
      <div>
        <p className="text-2xl font-bold text-white">Signin to Account</p>
      </div>
      <div>
        <form className="flex flex-col space-y-10 w-full items-center" onSubmit={handleSubmit}>
          <input type={'text'} placeholder="Username" className="p-1 w-full rounded-md bg-gray-700" value={formState.email} onChange = {(e) => setFormState((prev) => ({...formState, username:e.target.value}))} required/>
          <input type={'password'} placeholder="Password" className="p-1 w-full rounded-md bg-gray-700" value={formState.password} onChange = {(e) => setFormState((prev) => ({...formState, password:e.target.value}))} required/>
          <button className="bg-blue-700 w-fit py-1 px-6 rounded-lg">Login</button>
        </form>
        <div className="full flex justify-center p-3">
          <Link to="/register" className="text-sm text-blue-500 font-semibold">Or Create An Account</Link>
        </div>
      </div>
    </div>
  )
}