import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/middleware";

export async function GET(
    req: NextRequest,
) {
    try {
        const sessionId = req.cookies.get("session");

        if (!sessionId) {
            return NextResponse.json({ error: "No session found" }, { status: 401 });
        }

        const session = getSession(req);
        if (!session) {
            return NextResponse.json({ error: "Session not found" }, { status: 401 });
        }

        return NextResponse.json({ message: "User is logged in" });
    } catch (error) {
        console.log(error);
        // Return an error response if the token is invalid or expired
        return NextResponse.json({ error: "Invalid JWT token" }, { status: 401 });
    }
}