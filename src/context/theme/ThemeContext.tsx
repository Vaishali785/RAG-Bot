import { createContext } from "react"
import type { Themes } from "../../types/app-types"

type ThemeContextType = {
	theme: Themes
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(undefined)
