import { Moon, Sun } from "lucide-react"
import { useContext } from "react"
import { ThemeContext } from "../context/theme/ThemeContext"

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useContext(ThemeContext)

	return (
		<button
			onClick={toggleTheme}
			aria-label="Toggle theme"
			className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-(image:--gradient-button)! hover:text-white cursor-pointer dark:hover:bg-white/10 transition-all"
		>
			{theme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
		</button>
	)
}
