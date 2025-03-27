const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className="relative "
			style={{ background: "hsl(240 10% 3.9%)" }}>
			{/* Background gradient circles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div
					className="absolute -left-20 top-1/4 w-72 h-72 rounded-full"
					style={{
						background: "#8f199b",
						filter: "blur(100px)",
						opacity: "0.4",
					}}></div>
				<div
					className="absolute -right-20 bottom-1/4 w-72 h-72 rounded-full"
					style={{
						background: "#8f199b",
						filter: "blur(100px)",
						opacity: "0.2",
					}}></div>
			</div>
			{children}
		</div>
	);
};

export default Wrapper;
