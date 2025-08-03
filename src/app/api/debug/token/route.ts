import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * 🔐 Debug endpoint to console and analyze JWT tokens from Clerk
 */
export async function GET() {
	try {
		const { userId, getToken } = await auth();

		if (!userId) {
			console.log("❌ No authenticated user found");
			return NextResponse.json(
				{ error: "Unauthorized - No JWT token available" },
				{ status: 401 }
			);
		}

		console.log("👤 Authenticated User ID:", userId);

		if (!getToken) {
			console.log("❌ getToken function not available");
			return NextResponse.json(
				{ error: "Token retrieval not available" },
				{ status: 500 }
			);
		}

		// Get the default JWT token
		const defaultToken = await getToken();
		console.log("🔐 Default JWT Token:", defaultToken);

		// Decode and log token parts (for debugging purposes)
		if (defaultToken) {
			try {
				const tokenParts = defaultToken.split('.');
				console.log("📊 Token Structure:");
				console.log("  - Header:", tokenParts[0]);
				console.log("  - Payload:", tokenParts[1]);
				console.log("  - Signature:", tokenParts[2]);

				// Decode the payload (base64url decode)
				const payload = JSON.parse(
					Buffer.from(tokenParts[1], 'base64url').toString('utf-8')
				);
				console.log("📄 Token Payload:", JSON.stringify(payload, null, 2));
			} catch (decodeError) {
				console.error("❌ Error decoding token:", decodeError);
			}
		}

		return NextResponse.json({
			success: true,
			message: "JWT token logged to console",
			userId,
			tokenAvailable: !!defaultToken,
			tokenLength: defaultToken?.length || 0
		});

	} catch (error) {
		console.error("❌ Token Debug Error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
