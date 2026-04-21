import { Settings, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeToggle } from "../ThemeToggle"

const Header = () => {
	return (
		<header className="relative z-10 px-8 py-6 w-full shadow-header">
			<div className=" mx-auto flex justify-between items-center">
				<div className="flex items-center gap-2 animate-fade-up">
					<div className="w-9 h-9 rounded-xl bg-gradient-button flex items-center justify-center shadow-soft">
						<Sparkles className="w-4 h-4 text-white" />
					</div>
					<span className="font-semibold text-lg tracking-tight">Lumen Co.</span>
				</div>

				<div className="flex items-center gap-2">
					<Link
						to="/admin"
						className="w-10 h-10 rounded-full glass hover:bg-white/80 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
						aria-label="Admin"
					>
						<Settings className="w-4 h-4" />
					</Link>
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}

export default Header
