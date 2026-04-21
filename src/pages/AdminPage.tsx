import { Settings } from "lucide-react"
import { useState } from "react"
import AppearanceTab from "../components/admin/AppearanceTab"
import KnowledgeTab from "../components/admin/KnowledgeTab"
import Tabs from "../components/admin/Tabs"
import type { TabSlug } from "../types/app-types"

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState<TabSlug>("knowledge")
	return (
		<main className="w-full z-20 py-10 h-full overflow-y-scroll">
			<div className="mx-auto w-6xl">
				<div className="mb-8 animate-fade-up ">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-foreground/70 mb-4">
						<Settings className="w-3 h-3" />
						Admin console
					</div>
					<h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
						Train <span className="text-gradient">Aria</span>.
					</h1>
					<p className="text-muted-foreground mt-2 max-w-xl">
						Knowledge, look & feel, behavior — all in one place.
					</p>
				</div>

				<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
				<KnowledgeTab activeTab={activeTab} />
				<AppearanceTab activeTab={activeTab} />
			</div>
		</main>
	)
}

export default AdminPage
