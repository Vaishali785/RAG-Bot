import { useState } from "react"
import ChatWindow from "../components/chat/ChatWindow"
import Input from "../components/chat/Input"

const HomePage = () => {
	const [typing, setTyping] = useState(false)
	const [msgs, setMsgs] = useState([
		{ id: crypto.randomUUID(), sender: "user", text: "Hi there, what your name?" },
		{ id: crypto.randomUUID(), sender: "ai", text: "Hi I am your AI assistant." },
		{ id: crypto.randomUUID(), sender: "user", text: "How can you help me?" },
		{
			id: crypto.randomUUID(),
			sender: "ai",
			text: "You can ask me anything about our terms and policies.",
		},
		{ id: crypto.randomUUID(), sender: "user", text: "Hi there, what your name?" },
		{ id: crypto.randomUUID(), sender: "ai", text: "Hi I am your AI assistant." },
		{ id: crypto.randomUUID(), sender: "user", text: "How can you help me?" },
		{
			id: crypto.randomUUID(),
			sender: "ai",
			text: "You can ask me anything about our terms and policies.",
		},
		{ id: crypto.randomUUID(), sender: "user", text: "Hi there, what your name?" },
		{ id: crypto.randomUUID(), sender: "ai", text: "Hi I am your AI assistant." },
		{ id: crypto.randomUUID(), sender: "user", text: "How can you help me?" },
		{
			id: crypto.randomUUID(),
			sender: "ai",
			text: "You can ask me anything about our terms and policies.",
		},
		{ id: crypto.randomUUID(), sender: "user", text: "Hi there, what your name?" },
		{ id: crypto.randomUUID(), sender: "ai", text: "Hi I am your AI assistant." },
		{ id: crypto.randomUUID(), sender: "user", text: "How can you help me?" },
		{
			id: crypto.randomUUID(),
			sender: "ai",
			text: "You can ask me anything about our terms and policies.",
		},
		{ id: crypto.randomUUID(), sender: "user", text: "Hi there, what your name?" },
		{ id: crypto.randomUUID(), sender: "ai", text: "Hi I am your AI assistant." },
		{ id: crypto.randomUUID(), sender: "user", text: "How can you help me?" },
		{
			id: crypto.randomUUID(),
			sender: "ai",
			text: "You can ask me anything about our terms and policies.",
		},
	])
	return (
		<>
			<ChatWindow messages={msgs} typing={typing} />
			<Input setMsgs={setMsgs} setTyping={setTyping} />
		</>
	)
}

export default HomePage
