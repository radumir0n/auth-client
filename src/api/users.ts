const baseUrl = 'http://localhost:5050/users'

const getUsers = async () => {
    const response = await fetch(`${baseUrl}`)
    const data = await response.json()
    console.log(data)

    return data.users;
}

const getUserById = async (id: string) => {
    const response = await fetch(`${baseUrl}/${id}`)
    const data = await response.json()

    return data
}

const login = async (creds: { username: string, password: string }) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })

    return await response.json()
}

const register = async (creds: { email: string, username: string, password: string }) => {
    const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })

    return await response.json()
}
  
export {
    getUsers,
    getUserById,
    login,
    register
}