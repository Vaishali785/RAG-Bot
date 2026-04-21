import type { LocalConfig, Palette } from "../types/app-types"

export const applyPalette = (p: Palette) => {
	const isDark = document.documentElement.classList.contains("dark")
	const v = isDark ? p.dark : p.light
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
}

export const storeLocalConfig = (config: LocalConfig) => {
	if (config.theme) {
		console.log(">>Theme")
		localStorage.setItem("theme", config.theme)
	}
	if (config.palette) {
		console.log(">>Palette", config)
		localStorage.setItem("palette", config.palette)
	}
}

export const getLocalConfig = (config: "theme" | "palette") => {
	// if(localStorage.getItem)
	return localStorage?.getItem(config)
}
