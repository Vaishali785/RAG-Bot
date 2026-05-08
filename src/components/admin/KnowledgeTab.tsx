import { Check, CircleX, Database, Loader, Upload } from "lucide-react"
import { useRef, useState, type ChangeEvent, type DragEvent } from "react"
import { useDocs } from "../../context/docs/DocsProvider"
import { cn } from "../../lib/utils"
import type { Status } from "../../types/app-types"

const KnowledgeTab = () => {
	const [dragOver, setDragOver] = useState(false)
	const { updateDocsList } = useDocs()

	const [status, setStatus] = useState<Status>("none")

	const fileRef = useRef<HTMLInputElement>(null)

	const handleFileUpload = async (files) => {
		const file = files[0]
		setStatus("loading")
		try {
			await updateDocsList(file)

			setStatus("success")
		} catch (err) {
			if (err instanceof Error) {
				console.log("err", err)
				setStatus("fail")
			}
		}
	}

	const onDrop = (e: DragEvent) => {
		e.preventDefault()
		setDragOver(false)
		handleFileUpload(e.dataTransfer.files)
	}

	const statusIcon = (status) => {
		switch (status) {
			case "loading":
				return {
					icon: <Loader className="w-5 h-5 text-white" />,
					mainText: "Please wait...",
					subText: "Uploading in Progress",
				}
			case "success":
				return {
					icon: <Check className="w-5 h-5 text-white" />,
					mainText: "Upload Complete",
					subText: "File uploaded successfully",
				}
			case "fail":
				return {
					icon: <CircleX className="w-5 h-5 " />,
					mainText: "Upload Failed",
					subText: "Something went wrong",
				}
			default:
				return {
					icon: <Upload className="w-5 h-5 text-white" />,
					mainText: "Upload File",
					subText: "Select a file to upload",
				}
		}
	}

	const currentStatus = statusIcon(status)
	return (
		<>
			<div className="glass rounded-3xl p-6 shadow-soft ">
				<div className="flex items-center gap-2 mb-4">
					<Database className="w-4 h-4 text-primary" />
					<h2 className="font-semibold">Knowledge base</h2>
				</div>

				<div
					onDragOver={(e) => {
						e.preventDefault()
						if (status !== "loading") {
							setDragOver(true)
						}
					}}
					onDragLeave={() => setDragOver(false)}
					onDrop={onDrop}
					onClick={() => {
						if (status !== "loading") {
							fileRef.current?.click()
						}
					}}
					className={cn(
						"rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all",
						dragOver
							? "border-primary bg-primary/5 scale-[1.01]"
							: "border-border/60 hover:border-primary/60 hover:bg-white/30 dark:hover:bg-white/5",
						status === "fail" && "zone-error",
					)}
				>
					<div
						className={cn(
							"w-12 h-12 mx-auto rounded-2xl bg-gradient-button flex items-center justify-center shadow-glow mb-3 error-icon",
							status === "fail" && "error-icon",
						)}
					>
						{currentStatus.icon}
						{/* {status ? (
								<Loader className="w-5 h-5 text-white" />
                                ) : (
                                    <Upload className="w-5 h-5 text-white" />
                                    )} */}
					</div>
					<>
						<h3 className={`font-medium text-sm `}>{currentStatus.mainText}</h3>
						<p className="text-xs text-muted-foreground mt-1">{currentStatus.subText}</p>
					</>

					{status !== "loading" && (
						<input
							ref={fileRef}
							type="file"
							multiple
							accept=".pdf,.md,.txt,.docx"
							className="hidden"
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								e.preventDefault()
								handleFileUpload(e.target.files)
							}}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default KnowledgeTab
