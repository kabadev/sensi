"use client";
import Overlay from "@/app/admin/components/Overlay";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/helper/logout";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="navbar flex items-center justify-between">
			{isOpen && (
				<div onClick={() => setIsOpen(false)}>
					<Overlay />
				</div>
			)}
			<div className="flex gap-2 items-center">
				<Menu
					className="text-white md:hidden"
					onClick={() => setIsOpen(true)}
				/>
				<Link
					href="/"
					className="brand flex items-center gap-2   w-[40px] rounded-md p-1 shadow-2xl"
				>
					<img src="/logo2.png" alt="" className="logo xx" />
					<h2 className="text-white font-bold">Sensi</h2>
				</Link>
			</div>

			<nav
				className={`flex items-center gap-16 text-white text ${
					isOpen && "active"
				}`}
			>
				<X className="close md:hidden" onClick={() => setIsOpen(false)} />
				<a href="/">Home</a>
				<a href="/requests">Requests</a>
				<a href="/profile">Profile</a>
			</nav>

			<Button
				onClick={handleLogout}
				className="bg-primary-color-light text-primary-color hover:text-white"
			>
				Logout
			</Button>
		</div>
	);
};

export default Navbar;
