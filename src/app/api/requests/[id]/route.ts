import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

import FinrequestModel, {
	deleteFinrequestById,
	getFinrequestById,
} from "@/models/finRequest";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connect();
	try {
		if (!params.id) {
			return new NextResponse("requests id is required", { status: 400 });
		}

		const request = await getFinrequestById(params.id);

		const response = NextResponse.json(
			{
				message: "Success",
				success: true,
				data: request,
			},
			{ status: 201 }
		);
		return response;
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		if (!params.id) {
			return new NextResponse("request id is required", { status: 400 });
		}
		const reqBody = await req.json();

		const requestData = await getFinrequestById(params.id);
		if (!requestData) {
			return new NextResponse("Business Not foud", { status: 404 });
		}

		const updatedRequest = await FinrequestModel.findByIdAndUpdate(
			requestData._id,
			reqBody,
			{
				new: true,
			}
		);

		const response = NextResponse.json(
			{
				message: "Success",
				success: true,
				data: updatedRequest,
			},
			{ status: 201 }
		);
		return response;
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		if (!params.id) {
			return new NextResponse("Request id is required", { status: 400 });
		}

		const request = await getFinrequestById(params.id);
		if (!request) {
			return new NextResponse("request Not foud", { status: 404 });
		}

		await deleteFinrequestById(request.id);

		const response = NextResponse.json(
			{
				message: "Success",
				success: true,
				data: request,
			},
			{ status: 200 }
		);
		return response;
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
