import { useState } from "react"
import { palettes } from "../../constants/data"
import { applyPalette, getLocalConfig, storeLocalConfig } from "../../lib/helper"
import type { PaletteOptions, Themes } from "../../types/app-types"
import { ThemeContext } from "./ThemeContext"

export function ThemeContextProvider({ children }) {
	const defaultTheme = getLocalConfig("theme") as Themes
	const [theme, setTheme] = useState<Themes>(defaultTheme)

	const toggleTheme = () => {
		const updatedTheme = theme == "light" ? "dark" : "light"
		setTheme(updatedTheme)
		document.documentElement.classList.toggle("dark", updatedTheme === "dark")
		storeLocalConfig({ theme: updatedTheme })

		const p: PaletteOptions = getLocalConfig("palette") as PaletteOptions
		const palette = palettes.find((palette) => palette.id == p)
		if (!palette) return
		applyPalette(palette, updatedTheme)
	}

	return (
		// 2. Wrap components with the Provider
		<ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
	)
}
