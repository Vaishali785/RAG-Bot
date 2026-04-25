const Typing = ({ typing }) => {
	return (
		<>
			{typing && (
				<div className="glass rounded-2xl rounded-bl-md px-4 py-3 shadow-soft flex gap-1">
					{[0, 1, 2].map((i) => (
						<span
							key={i}
							className="w-1.5 h-1.5 rounded-full bg-primary animate-typing"
							style={{ animationDelay: `${i * 150}ms` }}
						/>
					))}
				</div>
			)}
		</>
	)
}

export default Typing
