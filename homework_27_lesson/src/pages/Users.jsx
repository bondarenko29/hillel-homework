import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; 

const Users = () => {
    const { theme } = useTheme(); 

    
    const bgColorClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
    const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error('Error while fetching users', err);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <ul className="flex gap-4 flex-col p-4">
            {users.map((user) => (
                <li className={`rounded ${bgColorClass} ${textColorClass}`} key={user.id}>
                    <Link to={`/users/${user.id}`} className="block p-4 rounded hover:bg-gray-700 transition">
                        <span className="font-semibold">{user.name}</span>
                        <p className="text-sm text-gray-400">{user.email}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Users;