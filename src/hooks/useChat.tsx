import { useEffect, useReducer, useRef, useState } from "react"
import { CHAT_API } from "../constants/queries"
import { getSessionId } from "../lib/helper"
import type { Msg, MsgAction, SendMsgProps } from "../types/app-types"

function msgReducer(msgs: Msg[], action: MsgAction): Msg[] {
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
		if (error instanceof Error) {
			console.log("error", error)
			return []
		}
	}
}

const sessionId = getSessionId()

const useChat = () => {
	const [msgs, dispatch] = useReducer(msgReducer, [], getInitialMsgs)
	const [abortController, setAbortController] = useState<AbortController | null>(null)
	const hasInitialized = useRef(false)

	useEffect(() => {
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs))
	}, [msgs])

	const streamResponse = async (query: string, msgId: string, filteredMsgs: Msg[]) => {
		const controller = new AbortController()
		setAbortController(controller)

		// auto-abort after 35 seconds (slightly more than backend timeout)
		const timeout = setTimeout(() => controller.abort(), 35000)

		try {
			const response = await fetch(CHAT_API, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"user-session-id": sessionId,
				},
				body: JSON.stringify({ question: query, msgs: filteredMsgs }),
				signal: controller.signal, // ties fetch to abort controller
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

			console.log(">>>ai", msg)
			dispatch({
				type: "FINISH_AI_MSG",
				id: msgId,
				msg: msg,
			})
		} catch (error) {
			if (error instanceof Error) {
				console.log("error", error)
				if (error instanceof Error && error.name === "AbortError") {
					dispatch({ type: "ERROR_AI_MSG", id: msgId, errorMsg: "Request cancelled." })
					return
				}
				dispatch({
					type: "ERROR_AI_MSG",
					id: msgId,
					errorMsg: error.message,
				})
			}
			// setError(error.message)
		} finally {
			clearTimeout(timeout)
			setAbortController(null)
		}
	}

	const sendMsg = async ({ query, type = "message", status = "loading" }: SendMsgProps) => {
		const userMsgId = crypto.randomUUID()
		const aiMsgId = crypto.randomUUID()

		const userMsg: Msg = {
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

		const filteredMsgs = updatedMsgs.filter((msg) => {
			const isGreeting = msg.type === "greeting"
			const isEmptyAssistantMsg = msg.sender === "assistant" && msg.content.trim() === ""

			return !isGreeting && !isEmptyAssistantMsg
		})

		console.log(filteredMsgs)
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
	return { sendMsg, msgs, initGreeting, clearChat, abortController }
}

export default useChat
