import { useState } from "react"
import ChatWindow from "../components/chat/ChatWindow"
import Input from "../components/chat/Input"
import useFetchApi from "../hooks/useFetchApi"

const HomePage = () => {
	const [typing, setTyping] = useState(false)
	const { result, aiThinking, fetchAPI } = useFetchApi()

	const [msgs, setMsgs] = useState([
		{ id: crypto.randomUUID(), sender: "ai", text: "Hi I am your AI assistant." },
	])
	return (
		<>
			<ChatWindow messages={msgs} typing={typing} aiThinking={aiThinking} />
			<Input
				// msgs={msgs}
				setMsgs={setMsgs}
				setTyping={setTyping}
				fetchAPI={fetchAPI}
				result={result}
			/>
		</>
	)
}

export default HomePage
