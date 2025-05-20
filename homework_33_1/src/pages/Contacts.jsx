import { useTheme } from '../context/ThemeContext'; 

const Contact = () => {
    const { theme } = useTheme(); 

   
    const bgColorClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

    return (
        <div className='flex gap-4 flex-col'>
          <div className={`p-4 ${bgColorClass} ${textColorClass}`}>
          <h2 className="text-2xl font-bold mb-4 text-center">Contact Me 📞</h2>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 space-y-4">
        <div>
          <h3 className="font-semibold">📍 Address:</h3>
          <p>123 React Street, Frontend City, 00001</p>
        </div>
        <div>
          <h3 className="font-semibold">📱 Phone:</h3>
          <p>+1 (555) 123-4567</p>
        </div>
        <div>
          <h3 className="font-semibold">📧 Email:</h3>
          <p>youremail@example.com</p>
        </div>
      </div>
          </div>
        </div>
          
      );


}

export default Contact;