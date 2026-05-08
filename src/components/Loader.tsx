const Loader = ({ className }: { className?: string }) => {
	return (
		<div className="flex items-center justify-center h-full">
			<div className="relative">
				<div className={`relative ${className || "w-20 h-20"}`}>
					<div
						className="absolute w-full h-full rounded-full border-[3px] border-gray-100/20 border-r-primary border-b-primary animate-spin"
						style={{ animationDuration: "3s", animationDirection: "alternate-reverse" }}
					/>
					<div
						className="absolute w-full h-full rounded-full border-[3px] border-gray-100/20 border-r-primary border-b-primary animate-spin"
						style={{ animationDuration: "3s", animationDirection: "normal" }}
					/>
				</div>
			</div>
		</div>
	)
}

export default Loader
