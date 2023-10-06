import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import Business, {
	deleteBusinessById,
	getBusinessByEmail,
	getBusinessById,
	getBusinesses,
} from "@/models/businessModel";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	await connect();
	try {
		if (!params.id) {
			return new NextResponse("Business id is required", { status: 400 });
		}

		const business = await getBusinessById(params.id);

		const response = NextResponse.json(
			{
				message: "Success",
				success: true,
				data: business,
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
			return new NextResponse("User id is required", { status: 400 });
		}
		const reqBody = await req.json();
		const { photo, password } = reqBody;

		const data: any = {
			businessName: reqBody.businessName,
			email: reqBody.email,
			address: reqBody.address,
			contact: reqBody.contact,
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

		const business = await getBusinessById(params.id);
		if (!business) {
			return new NextResponse("Business Not foud", { status: 404 });
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
export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		if (!params.id) {
			return new NextResponse("Business id is required", { status: 400 });
		}

		const business = await getBusinessById(params.id);
		if (!business) {
			return new NextResponse("Business Not foud", { status: 404 });
		}

		await deleteBusinessById(business.id);

		const response = NextResponse.json(
			{
				message: "Success",
				success: true,
			},
			{ status: 201 }
		);
		return response;
	} catch (error) {
		return new NextResponse("Internal error", { status: 500 });
	}
}
