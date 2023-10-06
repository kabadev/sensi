import Header from "../components/Header";

export default function BusinessLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="business__layout">
			{<Header />}
			<div className="w-[80%] m-auto mt-[-100px] max-md:w-[99%] max-md:mt-[-80px]">
				{children}
			</div>
		</div>
	);
}
