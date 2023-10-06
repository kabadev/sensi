import { connect } from "@/dbConfig/dbConfig";
import { getBusinessByEmail } from "@/models/businessModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
	await connect();
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;

		// //check if user exists
		const user = await getBusinessByEmail(email);

		if (!user) {
			return NextResponse.json(
				{ error: "Incorrect password or email" },
				{ status: 400 }
			);
		}
		const validPassword = await bcryptjs.compare(password, user.password);
		if (!validPassword) {
			return NextResponse.json(
				{ error: "Incorrect password or email" },
				{ status: 400 }
			);
		}
		//create token data
		const tokenData = {
			id: user._id,
			email: user.email,
			isAdmin: user.isAdmin,
		};
		//create token
		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1w",
		});

		const response = NextResponse.json({
			message: "Login successful",
			success: true,
			data: user,
		});

		response.cookies.set("SENSI-AUTH", token, {
			httpOnly: true,
		});
		// if (user.isAdmin) {
		response.cookies.set("SENSI-AUTH-ISADMIN", user.isAdmin, {
			httpOnly: true,
		});
		// }

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
