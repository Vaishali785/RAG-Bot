import { CheckCircle2, FileText, Trash2 } from "lucide-react"
import { useEffect } from "react"
import { useDocs } from "../../context/docs/DocsProvider"
import Loader from "../Loader"

const DocumentList = () => {
	const { error, status, docsList, deleteDocsList, fetchDocsList } = useDocs()

	const handleDelete = async (name) => {
		deleteDocsList(name)
	}
	useEffect(() => {
		fetchDocsList()
	}, [])

	if (status == "loading") return <Loader />

	if (error)
		return (
			<div className="mt-6 space-y-2">
				<div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm zone-error justify-center hover:bg-white/60 dark:hover:bg-white/5 transition-colors group text-destructive">
					Oops! Some error occurred!
				</div>
			</div>
		)
	return (
		<div className="mt-6 space-y-2">
			<p className="text-xs font-medium text-muted-foreground px-1">
				{docsList?.length} document{docsList?.length !== 1 && "s"} indexed
			</p>
			{docsList?.map((doc, index) => (
				<div
					key={index}
					className="flex items-center gap-3 px-4 py-3 rounded-xl glass hover:bg-white/60 dark:hover:bg-white/5 transition-colors group animate-message-in"
				>
					<div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
						<FileText className="w-4 h-4 text-primary" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">{doc.name}</p>
						<p className="text-xs text-muted-foreground">{doc.size}</p>
					</div>
					<span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
						<CheckCircle2 className="w-3 h-3" />
						{doc.size}
					</span>

					<button
						onClick={() => handleDelete(doc.name)}
						className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center transition-all"
						aria-label="Remove"
					>
						<Trash2 className="w-3.5 h-3.5 text-destructive" />
					</button>
				</div>
			))}
		</div>
	)
}

export default DocumentList
