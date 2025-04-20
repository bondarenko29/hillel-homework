import { useTheme } from '../context/ThemeContext'; // Імпортуємо хук useTheme
import TodoList from '../components/TodoList';
const Main = () => {
    const { theme } = useTheme(); // Отримуємо значення теми з контексту

    // Визначаємо класи Tailwind CSS на основі поточної теми
    const bgColorClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
    return (
        <div className={`p-8 ${bgColorClass} ${textColorClass}`}>
            <TodoList />
        </div>
    )
}

export default Main;