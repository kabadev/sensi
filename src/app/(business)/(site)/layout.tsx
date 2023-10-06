import { RequestProvider } from "@/context/RequestContext";
import "./style.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Sensi Business ",
	description: "This is sensi business",
};
export default function BusinessLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<RequestProvider>
			<div className="business__layout">{children}</div>;
		</RequestProvider>
	);
}
