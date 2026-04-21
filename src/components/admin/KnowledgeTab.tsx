import { CheckCircle2, Database, FileText, Trash2, Upload } from "lucide-react"
import { useRef, useState, type ChangeEvent, type DragEvent } from "react"
import { initialDocs } from "../../constants/data"
import { cn } from "../../lib/utils"
import type { Doc } from "../../types/app-types"

const KnowledgeTab = ({ activeTab }) => {
	const [dragOver, setDragOver] = useState(false)
	const [docs, setDocs] = useState<Doc[]>(initialDocs)

	const fileRef = useRef<HTMLInputElement>(null)

	const formatSize = (bytes: number) => {
		if (bytes < 1024) return `${bytes} B`
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
		return `${(bytes / 1024 / 1024).toFixed(1)} MB`
	}
	const handleFiles = (files: FileList | null) => {
		if (!files) return
		const newDocs: Doc[] = Array.from(files).map((f) => ({
			id: crypto.randomUUID(),
			name: f.name,
			size: formatSize(f.size),
			status: "processing",
		}))
		setDocs((d) => [...newDocs, ...d])
		newDocs.forEach((doc) => {
			setTimeout(() => {
				setDocs((d) => d.map((x) => (x.id === doc.id ? { ...x, status: "indexed" } : x)))
			}, 1500)
		})
	}

	const onDrop = (e: DragEvent) => {
		e.preventDefault()
		setDragOver(false)
		handleFiles(e.dataTransfer.files)
	}

	const remove = (id: string) => setDocs((d) => d.filter((x) => x.id !== id))
	return (
		<>
			{activeTab === "knowledge" && (
				<div className="glass rounded-3xl p-6 shadow-soft">
					<div className="flex items-center gap-2 mb-4">
						<Database className="w-4 h-4 text-primary" />
						<h2 className="font-semibold">Knowledge base</h2>
					</div>

					<div
						onDragOver={(e) => {
							e.preventDefault()
							setDragOver(true)
						}}
						onDragLeave={() => setDragOver(false)}
						onDrop={onDrop}
						onClick={() => fileRef.current?.click()}
						className={cn(
							"rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all",
							dragOver
								? "border-primary bg-primary/5 scale-[1.01]"
								: "border-border/60 hover:border-primary/60 hover:bg-white/30 dark:hover:bg-white/5",
						)}
					>
						<div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-button flex items-center justify-center shadow-glow mb-3">
							<Upload className="w-5 h-5 text-white" />
						</div>
						<p className="font-medium text-sm">Drop files here or click to upload</p>
						<p className="text-xs text-muted-foreground mt-1">
							PDF, MD, TXT, DOCX · up to 20MB each
						</p>
						<input
							ref={fileRef}
							type="file"
							multiple
							accept=".pdf,.md,.txt,.docx"
							className="hidden"
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
						/>
					</div>

					<div className="mt-6 space-y-2">
						<p className="text-xs font-medium text-muted-foreground px-1">
							{docs.length} document{docs.length !== 1 && "s"} indexed
						</p>
						{docs.map((doc) => (
							<div
								key={doc.id}
								className="flex items-center gap-3 px-4 py-3 rounded-xl glass hover:bg-white/60 dark:hover:bg-white/5 transition-colors group animate-message-in"
							>
								<div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
									<FileText className="w-4 h-4 text-primary" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium truncate">{doc.name}</p>
									<p className="text-xs text-muted-foreground">{doc.size}</p>
								</div>
								{doc.status === "indexed" ? (
									<span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
										<CheckCircle2 className="w-3 h-3" />
										Indexed
									</span>
								) : (
									<span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
										<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
										Processing
									</span>
								)}
								<button
									onClick={() => remove(doc.id)}
									className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center transition-all"
									aria-label="Remove"
								>
									<Trash2 className="w-3.5 h-3.5 text-destructive" />
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default KnowledgeTab
