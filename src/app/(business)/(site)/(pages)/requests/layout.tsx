export default function BusinessLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="business__layout">
			<div className="w-[80%] m-auto mt-[-100px] max-md:w-[95%] bg-white rounded-t-md min-h-screen p-6  ">
				{children}
			</div>
		</div>
	);
}
