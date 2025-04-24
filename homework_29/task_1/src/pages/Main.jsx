import { useTheme } from '../context/ThemeContext'; 
import TodoList from '../components/TodoList1';
const Main = () => {
    const { theme } = useTheme(); 

   
    const bgColorClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
    return (
        <div className={`p-8 ${bgColorClass} ${textColorClass}`}>
            <TodoList />
        </div>
    )
}

export default Main;