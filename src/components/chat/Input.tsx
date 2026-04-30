import { useEffect, useRef, useState } from "react"
import SendBtn from "./SendBtn"

const Input = ({ sendMsg }) => {
	const [input, setInput] = useState(" ")
	const inputRef = useRef<HTMLTextAreaElement>(null)

	const handleSubmit = () => {
		sendMsg(input)
		setInput("")

		inputRef.current.style.height = "36px"
	}
	const handleEnter = (e) => {
		if (e.key === "Enter") {
			handleSubmit()
		}
	}

	useEffect(() => {
		const inputText = inputRef.current
		inputRef.current.style.height = "36px"
		if (input.trim() && inputText) {
			// Reset height to 'auto' to correctly calculate scrollHeight when shrinking
			// Set height to scrollHeight to match current content
			inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
		}
	}, [input])
	return (
		<div className="relative w-full ">
			<div className="flex justify-center w-full items-end p-2 mb-10">
				<div className={`w-3xl flex glass rounded-3xl pl-5 pr-2 py-2 shadow-soft `}>
					<textarea
						rows={1}
						ref={inputRef}
						value={input}
						name="msgInput"
						className="flex-1 w-full bg-transparent outline-none overflow-x-hidden placeholder:text-muted-foreground/60 py-2 resize-none h-9 text-sm"
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => handleEnter(e)}
						autoFocus
						placeholder="Type your question here.."
					/>

					<SendBtn send={handleSubmit} input={input} />
				</div>
			</div>
			<p className="text-center text-[11px] text-muted-foreground mt-3 absolute left-1/2 bottom-5 -translate-x-1/2">
				AI can make mistakes. Verify important info with our team.
			</p>
		</div>
	)
}

export default Input
