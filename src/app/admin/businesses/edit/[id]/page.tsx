import React from "react";

import EditB from "./Edit";

const page = ({ params }: { params: { id: string } }) => {
	return (
		<>
			<EditB params={params} />
		</>
	);
};

export default page;
