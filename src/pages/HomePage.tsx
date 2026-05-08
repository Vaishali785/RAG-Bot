import { useEffect } from "react"
import KnowledgeTab from "../components/admin/KnowledgeTab"
import ChatWindow from "../components/chat/ChatWindow"
import Input from "../components/chat/Input"
import Loader from "../components/Loader"
import { useDocs } from "../context/docs/DocsProvider"
import useChat from "../hooks/useChat"

const HomePage = () => {
	const { sendMsg, msgs, initGreeting } = useChat()
	const { docsList, status } = useDocs()

	useEffect(() => {
		if (docsList.length > 0 && msgs.length === 0) {
			initGreeting()
		}
	}, [docsList])

	if (status == "loading") return <Loader />

	if (docsList.length === 0)
		return (
			<div className="mx-auto w-3xl max-sm:mx-4 max-md:mx-10 max-md:w-auto max-md: overflow-y-scroll">
				<div className="my-8 animate-fade-up ">
					<h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
						Give your AI something to <span className="text-gradient">work with.</span>
					</h1>
					<p className="text-muted-foreground mt-2 max-w-xl">
						Upload a doc and your agent instantly knows what to say — no setup, no training runs.
					</p>
				</div>

				<KnowledgeTab />

				<p className="glass rounded-3xl p-6 shadow-soft my-4">
					<strong>👋 How it works — </strong>
					upload a file above and I'll read through it. Then just ask me anything and I'll answer
					based on exactly what's in your document.
				</p>
			</div>
		)
	return (
		<>
			<ChatWindow messages={msgs} typing="" />
			<Input sendMsg={sendMsg} lastMsg={msgs.at(-1)} />
		</>
	)
}

export default HomePage
