import { MessageCircle, Settings, Sparkles } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ThemeToggle } from "../ThemeToggle"

type Pages = "/" | "/admin"
const Header = () => {
	const { pathname } = useLocation()
	const [activePage, setActivePage] = useState<Pages>((pathname as Pages) ?? "/")
	return (
		<header className="relative z-10 px-8 py-6 w-full shadow-header">
			<div className=" mx-auto flex justify-between items-center">
				<Link to="/" className="flex items-center gap-2 animate-fade-up" aria-label="Logo">
					<div className="w-9 h-9 rounded-xl bg-gradient-button flex items-center justify-center shadow-soft">
						<Sparkles className="w-4 h-4 text-white" />
					</div>
					<span className="font-semibold text-lg tracking-tight">Lumen Co.</span>
				</Link>

				<div className="flex items-center gap-2">
					{activePage == "/" ? (
						<Link
							to="/admin"
							className="w-10 h-10 rounded-full glass hover:bg-white/80 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
							aria-label="Admin"
							onClick={() => setActivePage("/admin")}
						>
							<Settings className="w-4 h-4" />
						</Link>
					) : (
						<Link
							to="/"
							className="w-10 h-10 rounded-full glass hover:bg-white/80 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
							aria-label="Admin"
							onClick={() => setActivePage("/")}
						>
							<MessageCircle className="w-4 h-4" />
						</Link>
					)}
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}

export default Header
