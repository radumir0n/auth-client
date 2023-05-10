import { useContext } from "react"

import { AuthContext } from "../App"

const Navbar: React.FC = () => {
    const { userAuth } = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.removeItem('user')
        window.location.reload()
    }

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="text-white">
                            <h1>Auth Client</h1>
                        </div>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="/"
                               className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                                Dashboard
                            </a>
                            {
                            userAuth 
                            && <a href="/weather"
                                className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Weather
                               </a>
                            }
                            { 
                                userAuth 
                                ? <button 
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={handleLogout}>
                                        Logout
                                  </button>
                                : <a 
                                    href="/signup"
                                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Register
                                  </a>
                            }
                        </div>
                    </div>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
