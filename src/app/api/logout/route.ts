import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const response = NextResponse.json({
			message: "Logout successful",
			success: true,
		});

		response.cookies.set("SENSI-AUTH", "", {
			httpOnly: true,
		});

		response.cookies.set("SENSI-AUTH-ISADMIN", "", {
			httpOnly: true,
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
