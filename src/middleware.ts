import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
	getAllDataFromToken,
	getDataFromToken,
} from "./helper/getDataFromToken";
import { getBusinessById } from "./models/businessModel";

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const isPublicPath = path === "/login";

	const token = request.cookies.get("SENSI-AUTH")?.value || "";
	const isAdminToken = request.cookies.get("SENSI-AUTH-ISADMIN")?.value || "";

	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/", request.nextUrl));
	}

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	if (
		request.nextUrl.pathname.startsWith("/admin") &&
		isAdminToken === "false"
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/", "/login", "/requests/:path*", "/admin/:path*"],
};
