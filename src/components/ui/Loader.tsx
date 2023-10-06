import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
	return (
		<div className=" flex items-center justify-center fixed z-50 bg-white opacity-50 top-0 bottom-0 left-0 right-0">
			<Loader2 className=" text-3xl mr-2 h-10 w-10  animate-spin" />
		</div>
	);
};

export default Loader;
