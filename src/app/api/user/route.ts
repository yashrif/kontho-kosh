import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		// Get the authenticated user and token
		const { userId, getToken } = await auth();

		// Get and console the JWT token
		if (getToken) {
			const token = await getToken();
			console.log("🔐 JWT Token from Clerk:", token);
		}

		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		// Example: Get user's protected content
		const userContent = {
			userId,
			protectedDocuments: 0,
			verifications: 0,
			blockchainRecords: 0,
			securityScore: 100,
		};

		return NextResponse.json({
			success: true,
			data: userContent,
		});
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const { userId, getToken } = await auth();

		// Get and console the JWT token for POST requests too
		if (getToken) {
			const token = await getToken();
			console.log("🔐 JWT Token from Clerk (POST):", token);
		}

		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		const body = await request.json();
		console.log("User action:", { userId, body });

		// Process the user's request here
		// Example: Upload content, verify document, etc.

		return NextResponse.json({
			success: true,
			message: "Action processed successfully",
		});
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
