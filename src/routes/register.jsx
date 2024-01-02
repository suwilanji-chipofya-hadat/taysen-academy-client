import { useState } from "react"
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

const SIGNUP_MUTATION = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    createUser(username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName) {
      user {
        id
      }
    }
  }
`;
export default function Register() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [createUser] = useMutation(SIGNUP_MUTATION, {
    variables: {
      username: formState.username,
      email: formState.email,
      firstName: formState.firstName,
      lastName: formState.lastName,
      password: formState.password
    },
    onCompleted: ({ createUser }) => {
      console.log("User created successfully")
      navigate('/login');
    },
    onError: (error) => {
      setError(error)
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault()
    createUser()
  }
  return (
    <div className="flex flex-col items-center w-full min-h-[300px] justify-center space-y-5">
      <div>
        <p className="text-2xl font-bold text-white">Create Account</p>
      </div>
      <div>
        <form className="flex flex-col space-y-10 w-full items-center" onSubmit={handleSubmit}>
          <div className="flex  space-x-2">
            <input type={'text'} placeholder="First Name" className="p-1 w-full rounded-md bg-gray-700" value={formState.firstName} onChange = {(e) => setFormState((prev) => ({...formState, firstName:e.target.value}))} required/>
            <input type={'text'} placeholder="Last Name" className="p-1 w-full rounded-md bg-gray-700" value={formState.lastName} onChange = {(e) => setFormState((prev) => ({...formState, lastName:e.target.value}))} required/>
          </div>
          <input type={'text'} placeholder="Email" className="p-1 w-full rounded-md bg-gray-700" value={formState.email} onChange = {(e) => setFormState((prev) => ({...formState, email:e.target.value}))} required/>
          <input type={'text'} placeholder="Username" className="p-1 w-full rounded-md bg-gray-700" value={formState.username} onChange = {(e) => setFormState((prev) => ({...formState, username:e.target.value}))} required/>
          <input type={'password'} placeholder="Password" className="p-1 w-full rounded-md bg-gray-700" value={formState.password} onChange = {(e) => setFormState((prev) => ({...formState, password:e.target.value}))} required/>
          <button className="bg-blue-700 w-fit py-1 px-6 rounded-lg">Signup</button>
        </form>
        <div className="full flex justify-center p-3">
          <Link to="/login" className="text-sm text-blue-500 font-semibold">Or Login</Link>
        </div>
      </div>
    </div>
  )
}