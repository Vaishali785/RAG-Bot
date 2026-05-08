import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./App.tsx"
import DocsProvider from "./context/docs/DocsProvider.tsx"
import { ThemeContextProvider } from "./context/theme/ThemeContextProvider.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeContextProvider>
			<DocsProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</DocsProvider>
		</ThemeContextProvider>
	</StrictMode>,
)
