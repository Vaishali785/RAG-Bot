import type { LocalConfig, Palette } from "../types/app-types"

export const storeLocalConfig = (config: LocalConfig) => {
	if (config.theme) {
		localStorage.setItem("theme", config.theme)
	}
	if (config.palette) {
		localStorage.setItem("palette", config.palette)
	}
}

export const getLocalConfig = (config: "theme" | "palette") => {
	// if(localStorage.getItem)
	return localStorage?.getItem(config)
}

export const applyPalette = (p: Palette, theme?: "light" | "dark") => {
	const isDark =
		theme ?? getLocalConfig("theme") ?? document.documentElement.classList.contains("dark")
	const v = isDark == "dark" ? p.dark : p.light
	const r = document.documentElement
	r.style.setProperty("--primary", v.primary)
	r.style.setProperty("--accent", v.accent)
	r.style.setProperty("--ring", v.ring)
	r.style.setProperty("--gradient-button", v.gradientButton)
	r.style.setProperty("--gradient-bubble-user", v.gradientUser)
	r.style.setProperty("--gradient-page", v.gradientPage)
	r.style.setProperty("--gradient-orb-1", v.orb1)
	r.style.setProperty("--gradient-orb-2", v.orb2)
	r.style.setProperty("--gradient-orb-3", v.orb3)
	r.style.setProperty("--gradient-orb-core", v.orbCore)
	r.style.setProperty("--shadow-glow-color", v.primary)
}
