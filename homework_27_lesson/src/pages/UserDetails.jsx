import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTheme } from '../context/ThemeContext'; 

const UserDetails = () => {
    const { theme } = useTheme(); 


    const bgColorClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
    const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUser = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/users/${id}`
            );

            const data = await res.json();
            setUser(data);

        } catch (err) {
            console.error("Error while fetching user", err);
            
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    if (isLoading) {
        return <p className="p-8 text-gray-400 text-center">Loading...</p>
    }
    return (
            <div className="p-8">
                <div className={`p-8 rounded ${bgColorClass} ${textColorClass}`}>
                    <p>
                        <strong>Name:</strong> {user?.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user?.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {user?.phone}
                    </p>
                    <p>
                        <strong>City:</strong> {" "} {user?.address?.city}
                    </p>
                </div>
                <Link to='/users' className='p-2 inline-block mt-4 text-blue-400 hover:underline'>
                    ⇦ Back to Users
                </Link>
            </div>
    );
};


export default UserDetails;