import React from "react";
import Edit from "./Edit";

const page = ({ params }: { params: { id: string } }) => {
	return (
		<>
			<Edit params={params} />
		</>
	);
};

export default page;
