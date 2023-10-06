import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import Business, { getBusinessById } from "@/models/businessModel";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	await connect();
	try {
		const id = getDataFromToken(request);
		if (!id) {
			return new NextResponse("Business id is required", { status: 400 });
		}

		const business = await getBusinessById(id);

		const response = NextResponse.json(
			{
				message: "Success",
				success: true,
				data: business,
			},
			{ status: 200 }
		);
		return response;
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
export async function PATCH(request: NextRequest) {
	try {
		const id = getDataFromToken(request);
		if (!id) {
			return new NextResponse("Business id is required", { status: 400 });
		}
		const business = await getBusinessById(id);
		if (!business) {
			return new NextResponse("Business Not foud", { status: 404 });
		}
		// const businessData = await getBusinessById(id);

		const reqBody = await request.json();
		const { photo, password } = reqBody;

		const data: any = {
			businessName: reqBody.businessName,
			email: reqBody.email,
			address: reqBody.address,
			contact: reqBody.contact,
			description: reqBody.description,
		};
		if (photo) {
			data.photo = photo;
		}
		if (password) {
			//hash password
			const salt = await bcryptjs.genSalt(10);
			const hashedPassword = await bcryptjs.hash(password, salt);
			data.password = hashedPassword;
		}

		const updatedBusiness = await Business.findByIdAndUpdate(
			business.id,
			data,
			{
				new: true,
			}
		);

		const response = NextResponse.json(
			{
				message: "Success",
				success: true,
				data: updatedBusiness,
			},
			{ status: 201 }
		);
		return response;
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
