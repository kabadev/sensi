import React, { ReactNode } from "react";
import {
	Building2,
	CircleDollarSign,
	Home,
	Settings,
	Users2,
} from "lucide-react";

interface Page {
	name: string;
	path: string;
	icon: ReactNode;
}
export const Pages: Page[] = [
	{
		name: "Home",
		path: "/",
		icon: <Home />,
	},
	{
		name: "Requests",
		path: "/requests",
		icon: <CircleDollarSign />,
	},
	{
		name: "Businesses",
		path: "/businesses",
		icon: <Building2 />,
	},
	{
		name: "Users",
		path: "/users",
		icon: <Users2 />,
	},
];
