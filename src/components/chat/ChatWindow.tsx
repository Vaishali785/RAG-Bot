import { useEffect, useRef } from "react"
import Message from "./Message"

const ChatWindow = ({ messages, typing, aiThinking }) => {
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
	}, [messages, typing])
	return (
		<div ref={scrollRef} className="overflow-y-scroll w-full h-full">
			<div className="h-full w-3xl flex-1 z-2 p-8 pb-2 mx-auto">
				{messages?.map((msg) => (
					<Message msg={msg} key={msg.id} aiThinking={aiThinking} />
				))}
				{/* <Typing typing={typing} /> */}
			</div>
		</div>
	)
}

export default ChatWindow
