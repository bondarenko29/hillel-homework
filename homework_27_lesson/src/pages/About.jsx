import { useTheme } from '../context/ThemeContext'; 

const About = () => {
    const { theme } = useTheme(); 

   
    const bgColorClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

    return (
      <div className='flex gap-4 flex-col'>
        <div className={`p-4 ${bgColorClass} ${textColorClass}`}>
            <h2 className="text-xl font-bold mb-4">Про мене</h2>
            <p>Це сторінка "Про мене" з довільним контентом.</p>
            <p>Я розробник програмного забезпечення, який захоплюється React.</p>
            <p>Поточна тема: {theme}</p> 
        </div>
      </div>
        
    );
};

export default About;








// import { Link } from 'react-router-dom';
// const About = () => {
//     // return (
//     //     <div className='text-white text-base'>
//     //         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta asperiores architecto doloremque minima praesentium assumenda saepe dolorum repellendus dolorem sit quibusdam! Nemo laudantium facere nulla non voluptatem, tempora quo.

//     //     </div>
//     // )

    
//         return (
//           <div className="p-4 bg-light dark:bg-dark text-light dark:text-dark-text">
//             <h2 className="text-xl font-bold mb-4">Контакти</h2>
//             <p>Ви можете зв'язатися зі мною за адресою: example@email.com</p>
//             <p>Телефон: +380 XX XXX XX XX</p>
//           </div>
//         );
      
// }
// export default About;

