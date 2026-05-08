import { useEffect } from "react"
import { Route, Routes } from "react-router"
import "./App.css"
import { palettes } from "./constants/data"
import { applyPalette, getLocalConfig, storeLocalConfig } from "./lib/helper"
import AdminPage from "./pages/AdminPage"
import HomePage from "./pages/HomePage"
import Layout from "./pages/Layout"
import type { Themes } from "./types/app-types"

function App() {
	useEffect(() => {
		const theme = getLocalConfig("theme") as Themes
		const palette = getLocalConfig("palette")
		if (!theme || !palette) {
			storeLocalConfig({ theme: "light", palette: "lavender" })
		} else {
			document.documentElement.classList.add(theme === "dark" ? "dark" : "light")
			storeLocalConfig({ theme: theme })
			const selectedPalette = palettes.find((p) => p.id === palette)

			if (!selectedPalette) return

			applyPalette(selectedPalette, theme)
		}
	}, [])
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/admin" element={<AdminPage />} />
			</Route>
		</Routes>
	)
}

export default App
