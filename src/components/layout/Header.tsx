import { MessageCircle, RotateCcw, Settings, Sparkles } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import useChat from "../../hooks/useChat"
import { ThemeToggle } from "../ThemeToggle"

type PageName = "chat" | "admin"

const pages = {
	admin: {
		url: "/",
		title: "Go to Chat",
		icon: <MessageCircle className="w-4 h-4" />,
	},
	chat: {
		url: "/admin",
		title: "Go to Admin",
		icon: <Settings className="w-4 h-4" />,
	},
}
const Header = () => {
	const { pathname } = useLocation() // '/' or '/admin'
	const pageName = pathname === "/admin" ? "admin" : "chat"
	const [activePage, setActivePage] = useState<PageName>((pageName as PageName) ?? "chat")
	const { clearChat } = useChat()
	return (
		<header className="relative z-10 px-8 py-6 max-sm:px-4 max-sm:py-3 w-full shadow-header">
			<div className=" mx-auto flex justify-between items-center">
				<Link to="/" className="flex items-center gap-2 animate-fade-up" aria-label="Logo">
					<div className="w-9 h-9 rounded-xl bg-gradient-button flex items-center justify-center shadow-soft">
						<Sparkles className="w-4 h-4 text-white" />
					</div>
					{/* <span className="font-semibold text-lg tracking-tight">Lumen Co.</span> */}
				</Link>

				<div className="flex items-center gap-2">
					<button
						className="w-fit h-10 rounded-full text-(--glass-error-text) bg-(--glass-error-bg) dark:bg-(--glass-bg) border-(--glass-error-text) border  hover:bg-(--glass-error-text) hover:text-white flex items-center justify-center transition-all gap-2 px-4"
						onClick={() => {
							clearChat()
							window.location.reload()
						}}
					>
						<RotateCcw className="w-4 h-4" />
						<span className="text-xs max-sm:hidden">Reset Conversation</span>
					</button>
					<Link
						to={pages[activePage]?.url}
						className="w-fit h-10 rounded-full glass hover:bg-(image:--gradient-button)! hover:text-white flex items-center justify-center transition-all gap-2 px-4"
						aria-label="Admin"
						onClick={() => setActivePage((prev) => (prev === "admin" ? "chat" : "admin"))}
					>
						{pages[activePage]?.icon}
						<span className="text-xs max-sm:hidden">{pages[activePage]?.title}</span>
					</Link>

					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}

export default Header
