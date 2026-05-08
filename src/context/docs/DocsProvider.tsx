import { useContext, useEffect, useState } from "react"
import useChat from "../../hooks/useChat"
import { DOCS_API, REMOVE_DOC_API, UPDATE_DOC_API } from "../../lib/queries"
import type { Status } from "../../types/app-types"
import { DocsContext } from "./DocsContext"

type RequestProps<T> = {
	url: string
	method: "GET" | "POST"
	body?: BodyInit | null
	headers?: HeadersInit
	onSuccess?: (data?: T) => void
}

const DocsProvider = ({ children }) => {
	const [docsList, setDocsList] = useState([])
	const [error, setError] = useState("")
	const [status, setStatus] = useState<Status>("none")
	const { clearChat } = useChat()

	const request = async <T,>({
		url,
		method = "GET",
		body,
		headers = {},
		onSuccess,
	}: RequestProps<T>): Promise<T> => {
		setStatus("loading")
		setError("")

		try {
			const res = await fetch(url, {
				method,
				headers,
				body,
			})
			if (!res.ok) {
				throw new Error("Request failed")
			}

			const data = await res.json()
			setStatus("success")
			onSuccess?.(data)
			return data
		} catch (error) {
			setStatus("fail")
			setError(error.message)
			throw error
		} finally {
			setStatus("none")
		}
	}

	const fetchDocsList = async () => {
		const api = DOCS_API
		try {
			await request({ url: api, method: "GET", onSuccess: setDocsList })
		} catch (err) {
			console.log("err", err)
		}
	}

	const updateDocsList = async (file) => {
		const formData = new FormData()
		formData.append("file", file)
		const api = UPDATE_DOC_API
		await request({
			url: api,
			method: "POST",
			body: formData,
			onSuccess: fetchDocsList,
		})
	}
	const deleteDocsList = async (name) => {
		const api = REMOVE_DOC_API
		const status = await request({
			url: api,
			method: "POST",
			body: JSON.stringify({ data: name }),
			onSuccess: fetchDocsList,
		})

		if (status == "success") {
			const updatedDocs = docsList.filter((d) => d.name !== name)

			setDocsList(updatedDocs)

			if (updatedDocs.length === 0) {
				clearChat()
			}
		}
	}

	useEffect(() => {
		fetchDocsList()
	}, [])

	return (
		<DocsContext.Provider
			value={{ docsList, error, status, fetchDocsList, updateDocsList, deleteDocsList }}
		>
			{children}
		</DocsContext.Provider>
	)
}

export const useDocs = () => {
	return useContext(DocsContext)
}

export default DocsProvider
