export type Doc = { id: string; name: string; size: string; status: "indexed" | "processing" }

type ThemeVars = {
	primary: string
	accent: string
	ring: string
	gradientButton: string
	gradientUser: string
	gradientPage: string
	orb1: string
	orb2: string
	orb3: string
	orbCore: string
}

export type Palette = {
	id: PaletteOptions
	name: string
	swatches: string[]
	light: ThemeVars
	dark: ThemeVars
}

export type PaletteOptions = "lavender" | "ocean" | "sunset" | "forest" | "midnight" | "rose"

export type TabSlug = "knowledge" | "appearance"

export type LocalConfig = {
	theme?: "light" | "dark"
	palette?: PaletteOptions
}
