import { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/users'

interface UserCreds {
    email: string,
    username: string,
    password: string
}

const Register: React.FC = () => {
    const navigateTo = useNavigate()
    const [formInput, setFormInput] = useState({
        username: "",
        email: "",
        password: ""
    })
    const { mutate, isError, isLoading } = useMutation((creds: UserCreds) => register(creds), {
        onSuccess: (data) => {
            if (data.token)
                navigateTo('/')
        },
        onError: (error) => {
            console.error(error)
        }
    }) 

    const handleRegister = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, creds: UserCreds) => {
        event.preventDefault()

        const { email, username, password } = creds;

        mutate({ email, username, password })
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) <div>Error!</div>

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                    Sign up
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Username
                        </label>
                        <input
                            onChange={(e) => setFormInput({ ...formInput, username: e.target.value })}
                            value={formInput.username}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Email
                        </label>
                        <input
                            onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                            value={formInput.email}
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800">
                            Password
                        </label>
                        <input
                            onChange={(e) => setFormInput({ ...formInput, password: e.target.value })}
                            value={formInput.password}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button 
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            onClick={
                                (event) => handleRegister(event,
                                    { 
                                        email: formInput.email, 
                                        username: formInput.username, 
                                        password: formInput.password
                                    }
                                )}>
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Do you have an account?{" "}
                    <button 
                        className="font-medium text-purple-600 hover:underline"
                        onClick={() => navigateTo("/")}>
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Register
