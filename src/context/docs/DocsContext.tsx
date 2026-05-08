import { createContext } from "react"
import type { Doc, Status } from "../../types/app-types"
type DocsContextType = {
	docsList: Doc[]
	error: string
	status: Status
	fetchDocsList: () => Promise<void>
	updateDocsList: (file: File) => Promise<void>
	deleteDocsList: (name: string) => Promise<void>
}

export const DocsContext = createContext<DocsContextType | null>(null)
