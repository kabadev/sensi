import { connect } from "@/dbConfig/dbConfig";
import Business, {
	getBusinessByEmail,
	getBusinessById,
	getBusinesses,
} from "@/models/businessModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/helper/getDataFromToken";

export async function POST(request: NextRequest) {
	await connect();
	try {
		await connect();
		const userId = await getDataFromToken(request);
		const user = await getBusinessById(userId);
		if (!user.isAdmin) {
			return new NextResponse("Unauthorized", { status: 403 });
		}

		const reqBody = await request.json();
		const {
			businessName,
			email,
			address,
			contact,
			description,
			photo,
			password,
		} = reqBody;

		//check if user already exists
		const existingUser = await getBusinessByEmail(email);
		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		//hash password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newBusiness = new Business({
			businessName,
			email,
			address,
			contact,
			description,
			photo,
			password: hashedPassword,
		});

		const savedUser = await newBusiness.save();

		const response = NextResponse.json(
			{
				message: "New business created successfully",
				success: true,
				data: savedUser,
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

		const businesses = await getBusinesses();
		const response = NextResponse.json(
			{
				message: "Success",
				success: true,
				data: businesses,
			},
			{ status: 201 }
		);
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
