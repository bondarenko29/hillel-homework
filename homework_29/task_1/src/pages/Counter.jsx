import { useTheme } from '../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, clear } from '../store/features/counterSlice';


const Counter = () => {


    const { theme } = useTheme(); 
    const bgColorClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value);
    

    return (
        <div className={`max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg flex flex-col gap-4 ${bgColorClass} ${textColorClass}`}>
            <p className={`text-2xl ${bgColorClass} ${textColorClass}`}>Count: {count}</p>
            <button
                onClick={() => dispatch(increment())}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allow'
            >
                Increment
            </button>

            <button
                onClick={() => dispatch(decrement())}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50'
            >
                Decrement
            </button>

            <button
                onClick={() => dispatch(clear())}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50'
            >
                Clear
            </button>
        </div>
    )
};

export default Counter;