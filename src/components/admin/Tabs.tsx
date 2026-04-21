import { Database, Palette } from "lucide-react"
import { cn } from "../../lib/utils"
import type { TabSlug } from "../../types/app-types"

const tabs: { slug: TabSlug; label: string; icon: typeof Database }[] = [
	{ slug: "knowledge", label: "Knowledge", icon: Database },
	{ slug: "appearance", label: "Appearance", icon: Palette },
	//   { slug: "bot", label: "Bot", icon: Bot },
	//   { slug: "widget", label: "Widget", icon: MessageSquare },
]

type Props = {
	activeTab: TabSlug
	setActiveTab: (slug: TabSlug) => void
}

const Tabs = ({ activeTab, setActiveTab }: Props) => {
	return (
		<div
			className="flex flex-wrap gap-1.5 p-1.5 glass rounded-2xl mb-6 w-fit animate-fade-up"
			style={{ animationDelay: "0.05s" }}
		>
			{tabs.map(({ slug, label, icon: Icon }) => (
				<button
					key={slug}
					onClick={() => setActiveTab(slug)}
					className={cn(
						"px-4 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2 transition-all hover:cursor-pointer",
						activeTab === slug
							? "bg-gradient-button text-white shadow-soft"
							: "text-foreground/70 hover:bg-white/60 dark:hover:bg-white/5",
					)}
				>
					<Icon className="w-3.5 h-3.5" />
					{label}
				</button>
			))}
		</div>
	)
}

export default Tabs
