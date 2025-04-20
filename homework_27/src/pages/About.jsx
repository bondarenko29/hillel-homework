import { useTheme } from '../context/ThemeContext'; 

const About = () => {
    const { theme } = useTheme(); 

   
    const bgColorClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

    return (
      <div className='flex gap-4 flex-col'>
        <div className={`p-4 ${bgColorClass} ${textColorClass}`}>
        <img
          src="https://avatar.iran.liara.run/public/63"
          alt="My Avatar"
          className="w-36 h-36 rounded-full mb-4 shadow-lg"
        />
            <h2 className="text-xl font-bold mb-4">Frontend developer</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus rerum similique nihil
                dignissimos. Unde tempore obcaecati tempora non voluptatum voluptatem libero iste natus optio, quis
                corrupti. Cum repellat totam natus.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum laudantium, suscipit reprehenderit
                odit consequuntur iste voluptatibus officia voluptatem autem tempora distinctio rem alias sunt maxime
                officiis repellendus amet nam voluptate.</p>
            <p>Поточна тема: {theme}</p> 
        </div>
      </div>
        
    );
};

export default About;
