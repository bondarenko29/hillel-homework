import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="p-8 text-center flex flex-col">
            <h2 className="text-4xl font-bold text-red-400">404</h2>
            <p className="mt-2 text-gray-400">Page is not found</p>
            <Link to='/' className="text-blue-400 hover:underline mt-4 block">
                Back to Main
            </Link>
        </div>
    )
}

export default NotFound;