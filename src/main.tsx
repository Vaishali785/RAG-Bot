import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./App.tsx"
import { ThemeContextProvider } from "./context/ThemeContextProvider.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeContextProvider>
	</StrictMode>,
)
