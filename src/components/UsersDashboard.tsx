import jwtDecode from "jwt-decode"
import { useQuery } from "react-query"
import { getUserById, getUsers } from "../api/users"

interface User {
  username: string,
  email: string,
  updatedAt: string
}

const UsersDashboard: React.FC = () => {
    const token = localStorage.getItem('user') as string;
    const { id } = jwtDecode<{ id: string }>(token);
    const usersQuery = useQuery<User[]>('users', getUsers)
    const userQuery = useQuery<User>('user', () => getUserById(id))

    if (usersQuery.isLoading || userQuery.isLoading) return <div>Loading...</div>
    if (usersQuery.isError || userQuery.isError) return <div>Error!</div>

    return (
      <div className="container">
        <h1 className="mb-4 text-4xl">Users Dashboard</h1>
        <div className="container block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2>My Info:</h2>
          <ul>
            <li key='0'>Username: { userQuery.data?.username }</li>
            <li key='1'>Email: { userQuery.data?.email }</li>
            <li key='2'>Updated at: { new Date(userQuery.data?.updatedAt as string).toLocaleDateString() }</li>
          </ul>
        </div>
        <div className="container block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2>List of Users:</h2>
          <ul>
            {
              usersQuery.data?.map((user, id) => {
                return (
                    <li key={id}>{`${user.username} - ${user.email}`}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
}

export default UsersDashboard;
