import { useEffect, useRef } from "react"
import type { Msg } from "../../types/app-types"
import { AIMessage, UserMessage } from "./Message"

type Props = {
	messages: Msg[]
	typing: boolean
}

const ChatWindow = ({ messages, typing }: Props) => {
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		scrollRef.current?.scrollTo({ top: scrollRef.current?.scrollHeight, behavior: "smooth" })
	}, [messages, typing])
	return (
		<div ref={scrollRef} className="overflow-y-scroll w-full h-full">
			<div className="h-full w-3xl flex-1 z-2 p-8 pb-2 mx-auto">
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
