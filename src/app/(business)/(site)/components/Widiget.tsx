import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
const Widiget = () => {
	return (
		<div className="group bg-primary-color-light h-[150px]  rounded-md flex flex-col justify-between p-4 hover:bg-primary-color-darkest  hover:text-white transition-all duration-500">
			<div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary-color text-white">
				<IoPeopleOutline />
			</div>
			<div className="">
				<h3>Total Applications</h3>
				<h1 className="font-bold text-3xl text-primary-color-darkest group-hover:text-white transition-all duration-500 ">
					2,000
				</h1>
			</div>
		</div>
	);
};

export default Widiget;
