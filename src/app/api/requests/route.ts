import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { getBusinessById } from "@/models/businessModel";
import { addFinrequest, getAllFinrequests } from "@/models/finRequest";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	await connect();
	try {
		const userId = await getDataFromToken(request);
		const user = await getBusinessById(userId);
		const requestData = await request.json();

		requestData.business = user._id;
		const newFinrequest = await addFinrequest(requestData);

		const response = NextResponse.json(
			{
				message: "Financial request added successfully",
				success: true,
				data: newFinrequest,
			},
			{ status: 201 }
		);

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
export async function GET(request: NextRequest) {
	await connect();
	try {
		// const userId = await getDataFromToken(request);
		// const user = await getBusinessById(userId);
		// if (!user.isAdmin) {
		// 	return new NextResponse("Unauthorized", { status: 403 });
		// }

		const requests = await getAllFinrequests();
		const response = NextResponse.json(
			{
				message: "Success",
				success: true,
				data: requests,
			},
			{ status: 201 }
		);
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
