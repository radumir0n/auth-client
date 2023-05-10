import { useState } from "react"
import { useMutation } from "react-query"
import { useNavigate } from 'react-router-dom'
import { login } from "../api/users"

interface UserCreds {
    username: string,
    password: string
}

const Login: React.FC = () => {
    const { mutate, isError, isLoading } = useMutation((creds: UserCreds) => login(creds), {
        onSuccess: (data) => {
            if (data.token) {
                localStorage.setItem('user', data.token)
                window.location.reload()
            }
        },
        onError: (error) => {
            console.error(error)
        }
    }) 
    const navigateTo = useNavigate()
    const [formInput, setFormInput] = useState<UserCreds>({
        username: "",
        password: "",
    })
    
    const handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, creds: UserCreds) => {
        event.preventDefault()

        const { username, password } = creds;

        mutate({ username, password })
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) <div>Error!</div>

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                   Sign in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            value={formInput.username}
                            onChange={e => setFormInput({ ...formInput, username: e.target.value })}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold text-gray-800" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formInput.password}
                            onChange={e => setFormInput({ ...formInput, password: e.target.value })}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={(event) => handleLogin(event, {username: formInput.username, password: formInput.password})}
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a onClick={() => navigateTo("/signup")}
                       className="font-medium text-purple-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login
