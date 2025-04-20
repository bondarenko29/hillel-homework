import { useTheme } from "../context/ThemeContext";
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

export const ThemeSwitcher = () => {
    const { toggleTheme, theme } = useTheme();

    return (
        <button 
            onClick={toggleTheme} 
            className={`transition fa-solid${
                theme === 'dark'
                    ? " text-white hover:text-amber-300"
                    : " text-white hover:text-amber-300"
                }`}
            >
            {theme === 'dark' ? <CiSun className="text-[20px]"/> : <FaMoon className="text-[20px]"/>}
                                
        </button>
    )
}

export default ThemeSwitcher;