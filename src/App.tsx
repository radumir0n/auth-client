import { createContext, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"

import './App.css'
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"
import UsersDashboard from './components/UsersDashboard'
import WeatherInfo from './components/WeatherInfo'

export const AuthContext = createContext(null as any);
const queryClient = new QueryClient({});

const App: React.FC = () => {
  const [userAuth, setUserAuth] = useState(localStorage.getItem('user'))

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ userAuth, setUserAuth }}>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/" element={userAuth ? <UsersDashboard /> : <Login />} />
            <Route path="/weather" element={userAuth ? <WeatherInfo /> : <Login />} />
          </Routes>
        </AuthContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
