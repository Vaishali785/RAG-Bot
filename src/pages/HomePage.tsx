import { useEffect, useState } from "react"
import KnowledgeTab from "../components/admin/KnowledgeTab"
import ChatWindow from "../components/chat/ChatWindow"
import Input from "../components/chat/Input"
import Loader from "../components/Loader"
import ServerLoadingScreen from "../components/ServerLoadingScreen"
import { SERVER_STARTED } from "../constants/queries"
import { useDocs } from "../context/docs/DocsProvider"
import useChat from "../hooks/useChat"

const HomePage = () => {
	const { sendMsg, msgs, initGreeting, abortController } = useChat()
	const { docsList, status } = useDocs()
	const [serverReady, setServerReady] = useState(() => {
		return sessionStorage.getItem("server-ready") === "true"
	})

	useEffect(() => {
		if (docsList.length > 0 && msgs.length === 0) {
			initGreeting()
		}
	}, [docsList])

	// If server is not active
	const wakeServer = async () => {
		try {
			const res = await fetch(`${SERVER_STARTED}`)

			if (res.ok) {
				// setProgress(100)
				sessionStorage.setItem("server-ready", "true")

				setTimeout(() => {
					setServerReady(true)
				}, 300)

				return
			}

			setTimeout(wakeServer, 3000)
		} catch (err) {
			console.log("err", err)
			sessionStorage.removeItem("server-ready")
			setTimeout(wakeServer, 3000)
		}
	}

	useEffect(() => {
		wakeServer()
	}, [])

	if (status == "loading" && serverReady) return <Loader />

	if (!serverReady) {
		return <ServerLoadingScreen serverReady={serverReady} />
	}

	if (docsList.length === 0)
		return (
			<div className="mx-auto w-3xl max-sm:mx-4 max-md:mx-10 max-md:w-auto max-md: overflow-y-scroll">
				<div className="my-8 animate-fade-up ">
					<h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
						Give your AI something to <span className="text-gradient">work with.</span>
					</h1>
					<p className="text-muted-foreground mt-2 max-w-xl">
						Upload a PDF and your agent instantly knows what to say — no setup, no training runs.
					</p>
				</div>

				<KnowledgeTab />

				<p className="glass rounded-3xl p-6 shadow-soft my-4">
					<strong>👋 How it works — </strong>
					upload a .pdf file above and I'll read through it. Then just ask me anything and I'll
					answer based on exactly what's in your document.
				</p>
			</div>
		)
	return (
		<>
			<ChatWindow messages={msgs} />
			<Input sendMsg={sendMsg} lastMsg={msgs.at(-1)} abortController={abortController} />
		</>
	)
}

export default HomePage
