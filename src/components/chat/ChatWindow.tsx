import { useEffect, useRef } from "react"
import { AIMessage, UserMessage } from "./Message"

const ChatWindow = ({ messages, typing }) => {
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
	}, [messages, typing])
	return (
		<div ref={scrollRef} className="overflow-y-scroll w-full h-full">
			<div className="h-full w-3xl flex-1 z-2 p-8 pb-2 mx-auto">
				{messages?.map((msg) =>
					msg.sender === "user" ? <UserMessage msg={msg} /> : <AIMessage msg={msg} />,
				)}
			</div>
		</div>
	)
}

export default ChatWindow
