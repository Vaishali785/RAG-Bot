import { useEffect, useReducer, useRef } from "react"
import { CHAT_API } from "../lib/queries"

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
			return msgs.map((msg) =>
				msg.id === action.id ? { ...msg, content: action.msg, status: "done" } : msg,
			)
		case "ERROR_AI_MSG":
			return msgs.map((msg) =>
				msg.id === action.id ? { ...msg, status: "error", errorMsg: action.errorMsg } : msg,
			)
		case "CLEAR_MSGS":
			return []
		default:
			return msgs
	}
}

// const initialMsgs: Msg[] = []
const STORAGE_KEY = "chat_msgs"

const getInitialMsgs = () => {
	try {
		const storedMsgs = sessionStorage.getItem(STORAGE_KEY)
		return storedMsgs ? JSON.parse(storedMsgs) : []
	} catch (error) {
		console.log("error", error)
		return []
	}
}

const useChat = () => {
	const [msgs, dispatch] = useReducer(msgReducer, [], getInitialMsgs)
	const hasInitialized = useRef(false)

	useEffect(() => {
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs))
	}, [msgs])

	const streamResponse = async (query, msgId, filteredMsgs) => {
		try {
			const response = await fetch(CHAT_API, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ question: query, msgs: filteredMsgs }),
			})
			const msg = await response.json()
			// const reader = response.body.getReader()
			// const decoder = new TextDecoder()

			// console.log(">>>>inside stream ")
			// while (true) {
			// 	const { done, value } = await reader.read()
			// 	if (done) break

			// 	const decodedValue = decoder.decode(value)
			// 	const chunk = JSON.parse(decodedValue)
			// 	console.log(">>>>inside stream 2", chunk)
			// 	dispatch({
			// 		type: "UPDATE_AI_MSG",
			// 		id: msgId,
			// 		chunk,
			// 	})
			// }

			dispatch({
				type: "FINISH_AI_MSG",
				id: msgId,
				msg: msg,
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

	const sendMsg = async ({ query, type = "message", status = "loading" }) => {
		const userMsgId = crypto.randomUUID()
		const aiMsgId = crypto.randomUUID()

		const userMsg = {
			id: userMsgId,
			content: query,
			sender: "user",
			type,
		}

		const updatedMsgs = type === "message" ? [...msgs, userMsg] : msgs

		if (type == "message") {
			dispatch({
				type: "ADD_USER_MSG",
				payload: userMsg,
			})
		}

		dispatch({
			type: "START_AI_MSG",
			payload: {
				id: aiMsgId,
				content: "",
				sender: "assistant",
				status,
				type,
			},
		})

		const filteredMsgs = updatedMsgs.filter((msg) => msg.type !== "greeting")

		await streamResponse(query, aiMsgId, filteredMsgs)
	}

	const initGreeting = () => {
		if (hasInitialized.current) return

		hasInitialized.current = true

		sendMsg({
			query: "greetings",
			type: "greeting",
		})
	}

	const clearChat = () => {
		sessionStorage.removeItem("chat_msgs")

		dispatch({
			type: "CLEAR_MSGS",
		})
	}
	return { sendMsg, msgs, initGreeting, clearChat }
}

export default useChat
