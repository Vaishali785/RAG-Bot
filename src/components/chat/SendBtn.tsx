import { Send } from "lucide-react"
import { cn } from "../../lib/utils"

const SendBtn = ({ send, input, aiMsgLoading }) => {
	return (
		<button
			onClick={() => {
				if (!aiMsgLoading) {
					send()
				}
			}}
			disabled={aiMsgLoading || !input.trim()}
			className={cn(
				"w-9 h-9 rounded-full bg-gradient-button self-end flex items-center justify-center text-white transition-all",
				"hover:scale-105 active:scale-95 shadow-soft",
				(aiMsgLoading || !input.trim()) && "opacity-50 cursor-not-allowed hover:scale-100",
			)}
			aria-label="Send"
		>
			<Send className="w-4 h-4" />
		</button>
	)
}

export default SendBtn
