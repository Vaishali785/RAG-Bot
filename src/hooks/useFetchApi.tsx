import { useState } from "react"

const useFetchApi = () => {
	const [result, setResult] = useState("")
	const [aiThinking, setAiThinking] = useState(false)
	const fetchAPI = async (query) => {
		try {
			setAiThinking(true)
			const res = await fetch("http://localhost:8000/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ question: query }),
			})

			// setTimeout(() => {
			// 	console.log("HHHEYYYYYYYY")
			// }, 5000)
			setAiThinking(false)
			const answer = await res.json()
			setResult(answer)
		} catch (error) {
			console.log("error", error)
		}
	}

	return { result, aiThinking, fetchAPI }
}

export default useFetchApi
