import { NavLink, Outlet, useMatches } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"
import { useEffect } from "react";
import ThemeSwitcher from "./ThemeSwitcher"

const navLinks = [
    { to: "/", label: "Main" },
    { to: "/about", label: "About" },
    { to: "/contacts", label: "Contacts" },
    { to: "/counter", label: "Counter"},
]

const Header = () => {
    const matches = useMatches();
    const { toggleTheme, theme } = useTheme();
    const  darkMode = false;
    const currentTitle = [...matches]
    .reverse()
    .find(({ handle }) => handle.title)
    ?.handle.title || 'Default Title';

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);
    return (
        <div className={ theme === 'dark' ? 'dark' : ''}>
            <header className="p-8 w-full text-white flex items-center justify-between">
                <h1 className="text-3xl font-bold">{currentTitle}</h1>

                <nav className="space-x-6">
                    {navLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end
                            className={({ isActive }) => 
                                isActive
                                ? "text-yellow-400 underline"
                                : "text-blue-400 hover:underline"
                            }
                        >
                            {label}
                        </NavLink>
                        
                    ))}
                    <ThemeSwitcher />
                </nav>
                
            </header>

            <main className="px-8 pb-8">
                <Outlet />
            </main>
        </div>
    )
};

export default Header;