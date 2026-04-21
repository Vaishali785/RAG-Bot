import { Send } from "lucide-react"
import { cn } from "../../lib/utils"

const SendBtn = ({ send, input }) => {
	return (
		<button
			onClick={() => send()}
			disabled={!input.trim()}
			className={cn(
				"w-10 h-10 rounded-full bg-gradient-button flex items-center justify-center text-white transition-all",
				"hover:scale-105 active:scale-95 shadow-soft",
				!input.trim() && "opacity-50 cursor-not-allowed hover:scale-100",
			)}
			aria-label="Send"
		>
			<Send className="w-4 h-4" />
		</button>
	)
}

export default SendBtn
