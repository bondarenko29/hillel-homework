import { useTheme } from '../context/ThemeContext'; 

const Main = () => {
    const { theme } = useTheme(); 

    const bgColorClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
    return (
        <div className={`p-8 ${bgColorClass} ${textColorClass}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quasi necessitatibus dolor architecto, sunt officiis libero possimus, sint velit quaerat quos illo praesentium nemo consectetur eos magni neque expedita a.

        </div>
    )
}

export default Main;