import { Sparkles } from "lucide-react"
import { cn } from "../../lib/utils"

const Message = ({ msg }) => {
	return (
		<>
			<div
				key={msg.id}
				className={cn(
					"flex gap-3 animate-message-in my-3",
					msg.sender === "user" ? "justify-end" : "justify-start",
				)}
			>
				{msg.sender === "ai" && (
					<div className="w-8 h-8 rounded-full bg-gradient-button flex items-center justify-center shrink-0 shadow-soft">
						<Sparkles className="w-3.5 h-3.5 text-white" />
					</div>
				)}
				<div
					className={cn(
						"max-w-[75%] px-4 py-3 text-sm leading-relaxed shadow-soft",
						msg.sender === "user"
							? "bg-gradient-user text-white rounded-2xl rounded-br-md"
							: "glass rounded-2xl rounded-bl-md",
					)}
				>
					{msg.text}
				</div>
			</div>
		</>
	)
}

export default Message
