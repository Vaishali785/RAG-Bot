import { useEffect, useState } from "react"

const loadingSteps = [
	"Starting AI server...",
	"Loading models...",
	"Preparing documents...",
	"Connecting knowledge base...",
	"Almost ready...",
]

type Props = {
	progress: number
	setProgress: React.Dispatch<React.SetStateAction<number>>
}

const ServerLoadingScreen = ({ progress, setProgress }: Props) => {
	const [stepIndex, setStepIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 95) {
					clearInterval(interval)
					return 95
				}

				return Math.min(prev + Math.random() * 12, 95)
			})
		}, 1200)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		const stepTimer = setInterval(() => {
			setStepIndex((prev) => {
				if (prev >= loadingSteps.length - 1) {
					return prev
				}

				return prev + 1
			})
		}, 4000)

		return () => clearInterval(stepTimer)
	}, [])

	return (
		<div className="flex h-full items-center justify-center bg-background px-6">
			<div className="glass flex w-full max-w-md flex-col gap-6 rounded-3xl p-8 shadow-glow">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-semibold">Aria is waking up</h1>

					<p className="text-sm text-muted-foreground">
						The AI server is hosted on a free instance and may take up to a minute to start.
					</p>
				</div>

				<div className="flex flex-col gap-3">
					<div className="h-3 overflow-hidden rounded-full bg-muted">
						<div
							className="bg-gradient-button h-full rounded-full transition-all duration-700"
							style={{
								width: `${progress}%`,
							}}
						/>
					</div>

					<div className="flex items-center justify-between text-sm">
						<span>{loadingSteps[stepIndex]}</span>

						<span>{Math.floor(progress)}%</span>
					</div>
				</div>

				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
					Server cold start in progress
				</div>
			</div>
		</div>
	)
}

export default ServerLoadingScreen
