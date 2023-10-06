"use client";
import Link from "next/link";
import React from "react";
import { Home, LogOut, X } from "lucide-react";
import { Pages } from "../data/data";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/helper/logout";
const Sidebar = ({ isOpen, toggleSidebar, mobileItem }: any) => {
	const pathName = usePathname();

	return (
		<div
			className={`w-[300px] fixed h-screen  bg-primary-color-darkest p-3 rounded-r-[20px] transition-all duration-300 ${
				isOpen ? "max-md:left-[0] z-[111]" : "max-md:left-[-300px]"
			}`}
		>
			<div className="flex items-center justify-between h-12 border-b-[1px] border-primary-color  ">
				<h3 className="font-bold text-white">Menu</h3>
				<X onClick={toggleSidebar} className="text-white md:hidden" />
			</div>
			<div className="flex flex-col gap-2 mt-10">
				{Pages.map((link, i) => (
					<Link
						onClick={mobileItem}
						key={i}
						href={"/admin" + link.path}
						className={`flex items-center gap-4 w-full mb-4 text-slate-300 px-5 py-3 rounded-md hover:bg-primary-color-light transition-all duration-300 hover:text-primary-color-darkest ${
							pathName === "/admin" + link.path &&
							"bg-primary-color-light !text-primary-color-darkest"
						}`}
					>
						<span className="text-[0.9rem]">{link.icon}</span>
						<h3>{link.name}</h3>
					</Link>
				))}
			</div>
			<div className="absolute bottom-1">
				<span
					onClick={handleLogout}
					className="cursor-pointer flex items-center gap-4 w-full mb-4 text-slate-400"
				>
					<LogOut />
					<span>Logout</span>
				</span>
			</div>
		</div>
	);
};

export default Sidebar;
