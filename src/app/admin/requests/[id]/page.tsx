import React from "react";
import Request from "./Request";

const page = ({ params }: { params: { id: string } }) => {
	return (
		<>
			<Request params={params} />
		</>
	);
};

export default page;
