"use client";

import { DataFetchProvider } from "@/context/DataFetchContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Overlay from "./components/Overlay";
import { RequestProvider } from "@/context/RequestContext";

export default function AminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	const setMobileItem = () => {
		setIsSidebarOpen(false);
	};
	// const [openSidebar, setOpenSidebar] = useState(true);

	return (
		<DataFetchProvider>
			<RequestProvider>
				<div className="business__layout flex">
					{/* <Sidebar openSidebar={openSidebar} /> */}
					{isSidebarOpen && (
						<div onClick={toggleSidebar}>
							<Overlay />
						</div>
					)}

					<Sidebar
						isOpen={isSidebarOpen}
						toggleSidebar={toggleSidebar}
						mobileItem={setMobileItem}
					/>
					<div className="w-full ml-[300px] max-md:ml-0">
						<Navbar toggleSidebar={toggleSidebar} />
						<div className="w-[95%] m-auto ">{children}</div>
						{/* </DataFetchProvider> */}
					</div>
				</div>
			</RequestProvider>
		</DataFetchProvider>
	);
}
