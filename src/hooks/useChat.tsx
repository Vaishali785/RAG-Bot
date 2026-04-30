import { useReducer } from "react"
import type { Msg } from "../types/app-types"

function msgReducer(msgs, action) {
	switch (action.type) {
		case "ADD_USER_MSG":
			return [...msgs, action.payload]
		case "START_AI_MSG":
			return [...msgs, action.payload]
		case "UPDATE_AI_MSG":
			return msgs.map((msg) =>
				msg.id === action.id
					? {
							...msg,
							content: msg.content + action.chunk,
						}
					: msg,
			)
		case "FINISH_AI_MSG":
			return msgs.map((msg) => (msg.id === action.id ? { ...msg, status: "done" } : msg))
		case "ERROR_AI_MSG":
			return msgs.map((msg) =>
				msg.id === action.id ? { ...msg, status: "error", errorMsg: action.errorMsg } : msg,
			)
		default:
			return msgs
	}
}

const initialMsgs: Msg[] = []

const useChat = () => {
	const [msgs, dispatch] = useReducer(msgReducer, initialMsgs)

	const streamResponse = async (query, msgId) => {
		try {
			const response = await fetch("http://localhost:8000/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ question: query }),
			})
			const reader = response.body.getReader()
			const decoder = new TextDecoder()

			while (true) {
				const { done, value } = await reader.read()
				if (done) break

				const decodedValue = decoder.decode(value)
				const chunk = JSON.parse(decodedValue)
				dispatch({
					type: "UPDATE_AI_MSG",
					id: msgId,
					chunk,
				})
			}

			dispatch({
				type: "FINISH_AI_MSG",
				id: msgId,
			})
		} catch (error) {
			console.log("error", error)
			dispatch({
				type: "ERROR_AI_MSG",
				id: msgId,
				errorMsg: error.message,
			})
			// setError(error.message)
		}
	}

	const sendMsg = async (query) => {
		const userMsgId = crypto.randomUUID()
		const aiMsgId = crypto.randomUUID()
		dispatch({
			type: "ADD_USER_MSG",
			payload: {
				id: userMsgId,
				content: query,
				sender: "user",
				// status: "done",
			},
		})

		dispatch({
			type: "START_AI_MSG",
			payload: {
				id: aiMsgId,
				content: "",
				sender: "ai",
				status: "loading",
			},
		})

		streamResponse(query, aiMsgId)
	}

	return { msgs, sendMsg }
}

export default useChat
