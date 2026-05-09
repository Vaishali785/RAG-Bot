import { CircleAlert, Sparkles } from "lucide-react"
import Markdown from "react-markdown"
import { cn } from "../../lib/utils"
import type { Msg } from "../../types/app-types"
import Typing from "./Typing"

export const UserMessage = ({ msg }: { msg: Msg }) => {
	return (
		<div key={msg.id} className={cn("flex gap-3 animate-message-in my-3 justify-end")}>
			<div
				className={cn(
					"max-w-[90%] lg:max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-soft bg-gradient-user text-white rounded-2xl rounded-br-md",
				)}
			>
				{msg.content}
			</div>
		</div>
	)
}

export const Greetings = ({ msg }: { msg: Msg }) => {
	return (
		<div
			className={cn(
				"greet flex flex-col gap-2  max-w-[90%] lg:max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-soft rounded-2xl  rounded-tl-md",
				msg.status === "error" ? "glass-error" : "glass",
			)}
		>
			<Markdown>{msg.content}</Markdown>
		</div>
	)
}

export const AIMessage = ({ msg }: { msg: Msg }) => {
	return (
		<div key={msg.id} className={cn("flex gap-3 animate-message-in my-3 justify-start")}>
			<div className="w-8 h-8 rounded-full bg-gradient-button flex items-center justify-center shrink-0 shadow-soft">
				<Sparkles className="w-3.5 h-3.5 text-white" />
			</div>
			{msg.status === "loading" ? (
				<Typing />
			) : msg.type === "greeting" ? (
				<Greetings msg={msg} />
			) : (
				<div
					className={cn(
						"flex gap-2 items-center max-w-[90%] lg:max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-soft rounded-2xl  rounded-tl-md",
						msg.status === "error" ? "glass-error" : "glass",
					)}
				>
					{msg.status === "error" && <CircleAlert className="w-3.5 h-3.5" />}
					{msg.status === "error" ? (
						<Markdown>{msg.errorMsg}</Markdown>
					) : (
						<Markdown>{msg.content}</Markdown>
					)}
				</div>
			)}
		</div>
	)
}
