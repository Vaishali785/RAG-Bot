import { Sparkles } from "lucide-react"
import { cn } from "../../lib/utils"
import Typing from "./Typing"

export const UserMessage = ({ msg }) => {
	return (
		<div key={msg.id} className={cn("flex gap-3 animate-message-in my-3 justify-end")}>
			<div
				className={cn(
					"max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-soft bg-gradient-user text-white rounded-2xl rounded-br-md",
				)}
			>
				{msg.content}
			</div>
		</div>
	)
}

export const AIMessage = ({ msg }) => {
	return (
		<div key={msg.id} className={cn("flex gap-3 animate-message-in my-3 justify-start")}>
			<div className="w-8 h-8 rounded-full bg-gradient-button flex items-center justify-center shrink-0 shadow-soft">
				<Sparkles className="w-3.5 h-3.5 text-white" />
			</div>
			{msg.status === "loading" ? (
				<Typing />
			) : (
				<div
					className={cn(
						"max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-soft glass rounded-2xl  rounded-bl-md",
					)}
				>
					{msg.status === "error" ? msg.errorMsg : msg.content}
				</div>
			)}
		</div>
	)
}
