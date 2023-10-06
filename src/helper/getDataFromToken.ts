import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
	try {
		const token = request.cookies.get("SENSI-AUTH")?.value || "";
		const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
		return decodedToken.id;
	} catch (error: any) {
		throw new Error("Authentication failed");
	}
};
export const getAllDataFromToken = (request: NextRequest) => {
	// try {
	const token = request.cookies.get("SENSI-AUTH")?.value || "";
	if (token) {
		const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
		return decodedToken;
	}
	// } catch (error: any) {
	// 	throw new Error("Authentication failed");
	// }
};
