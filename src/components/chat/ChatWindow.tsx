import { useEffect, useRef } from "react"
import type { Msg } from "../../types/app-types"
import { AIMessage, UserMessage } from "./Message"

type Props = {
	messages: Msg[]
}

const ChatWindow = ({ messages }: Props) => {
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: scrollRef.current?.scrollHeight, behavior: "smooth" })
	}, [messages])
	return (
		<div ref={scrollRef} className="overflow-y-scroll w-full h-full">
			<div className="h-full md:w-3xl lg:w-6xl max-sm:mx-0 max-md:p-4 max-md:mx-10 max-md:w-auto flex-1 z-2 md:p-8 pb-2 ">
				{messages?.map((msg) =>
					msg.sender === "user" ? (
						<UserMessage msg={msg} key={msg.id} />
					) : (
						<AIMessage msg={msg} key={msg.id} />
					),
				)}
			</div>
		</div>
	)
}

export default ChatWindow
