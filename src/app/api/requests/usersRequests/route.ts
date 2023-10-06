import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { getBusinessById } from "@/models/businessModel";
import { getFinrequestsByUser } from "@/models/finRequest";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	await connect();
	try {
		const userId = await getDataFromToken(request);
		const user = await getBusinessById(userId);
		if (!user) {
			return new NextResponse("Unauthorized", { status: 403 });
		}

		const requests = await getFinrequestsByUser(user._id);
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
