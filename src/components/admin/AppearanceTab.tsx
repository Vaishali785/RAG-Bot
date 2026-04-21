import { Check, Palette } from "lucide-react"
import { useState } from "react"
import { palettes } from "../../constants/data"
import { applyPalette, getLocalConfig, storeLocalConfig } from "../../lib/helper"
import { cn } from "../../lib/utils"
import type { PaletteOptions, TabSlug } from "../../types/app-types"

const AppearanceTab = ({ activeTab }: { activeTab: TabSlug }) => {
	const palette: PaletteOptions = (getLocalConfig("palette") ?? "lavender") as PaletteOptions
	const [paletteId, setPaletteId] = useState<PaletteOptions>(palette)
	return (
		<>
			{activeTab === "appearance" && (
				<div className="space-y-6">
					<div className="glass rounded-3xl p-6 shadow-soft">
						<div className="flex items-center gap-2 mb-1">
							<Palette className="w-4 h-4 text-primary" />
							<h2 className="font-semibold">Color palette</h2>
						</div>
						<p className="text-xs text-muted-foreground mb-5">
							Each palette has matched light & dark variants — switches with your theme.
						</p>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							{palettes.map((p) => (
								<button
									key={p.id}
									onClick={() => {
										setPaletteId(p.id)
										applyPalette(p)
										storeLocalConfig({ palette: p.id })
									}}
									className={cn(
										"relative text-left p-4 rounded-2xl glass hover:-translate-y-0.5 transition-all border-2 hover:cursor-pointer",
										paletteId === p.id ? "border-primary shadow-glow" : "border-transparent",
									)}
								>
									<div className="flex gap-1.5 mb-3">
										{p.swatches.map((c, i) => (
											<span
												key={i}
												className="w-7 h-7 rounded-lg shadow-soft"
												style={{ backgroundColor: c }}
											/>
										))}
									</div>
									<p className="text-sm font-medium">{p.name}</p>
									{paletteId === p.id && (
										<div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-button flex items-center justify-center shadow-soft">
											<Check className="w-3 h-3 text-white" />
										</div>
									)}
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default AppearanceTab
