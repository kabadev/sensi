import { Button } from "@/components/ui/button";
import { handleLogout } from "@/helper/logout";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = ({ toggleSidebar }: any) => {
	return (
		<div className="h-[70px] px-4 flex items-center justify-between max-md:bg-white">
			<div className="flex gap-3 items-center">
				<Menu
					className="text-slate-500 cursor-pointer md:hidden"
					onClick={toggleSidebar}
				/>
				<Link href="/admin">
					<img width={100} src="/logo.png" alt="" />
				</Link>
			</div>
			{/* <div className="rounded-full h-9 w-9 overflow-hidden"> */}
			<Button onClick={handleLogout}>Logout</Button>
			{/* </div> */}
		</div>
	);
};

export default Navbar;
