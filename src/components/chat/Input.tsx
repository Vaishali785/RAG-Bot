import { useState } from "react"
import SendBtn from "./SendBtn"

const Input = ({ setMsgs, setTyping }) => {
	const [input, setInput] = useState("")

	const handleTyping = (e) => {
		setTyping(true)
		setInput(e.target.value)
	}
	const handleEnter = (e) => {
		if (e.key === "Enter") {
			setTyping(false)
			const newMsg = { id: crypto.randomUUID(), sender: "user", text: input }
			setMsgs((prev) => [...prev, newMsg])
			setInput("")
		}
	}

	return (
		<div className="flex justify-center w-full items-end p-2">
			<div className="w-3xl flex glass rounded-full pl-5 pr-2 py-2 shadow-soft ">
				{/* <textarea
                    rows={2}
                    name="msgInput"
                    className="flex-1 w-3xl bg-transparent outline-none text-sm placeholder:text-muted-foreground/60 py-2 glass rounded-full pl-5 pr-2 py-2 shadow-soft absolute bottom-4 mx-auto h-10 resize-auto"
                    placeholder="Type your question here.."
                >
                    Input
                </textarea> */}
				<input
					value={input}
					onChange={(e) => handleTyping(e)}
					onKeyDown={(e) => handleEnter(e)}
					placeholder="Ask Aria anything..."
					className="flex-1 w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground/60 py-2 "
					autoFocus
				/>
				<SendBtn send={handleEnter} input={input} />
			</div>
		</div>
	)
}

export default Input
