import { NextRequest, NextResponse } from "next/server";
import { default as jwt } from "jsonwebtoken"
import { loginidValidateJwt } from "@/app/lib/loginid";
import db from "@/app/lib/db";
import { saveSession } from "@/app/lib/middleware";

const config = {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "",
    appId: process.env.NEXT_PUBLIC_APP_ID || "",
};

export async function POST(
    req: NextRequest,
) {
    const { jwtAccess } = await req.json();

    try {
        const decodedJwt = jwt.decode(jwtAccess);
        loginidValidateJwt(jwtAccess, decodedJwt.iss);

        const user = db.data.users.find(user => user.username === decodedJwt.username);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        const sessionId = saveSession(decodedJwt.username, jwtAccess);

        const res = NextResponse.json({ message: "JWT token is valid" }, { status: 200 });

        res.cookies.set("session", sessionId, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
        });

        return res
    } catch (error) {
        console.log(error);
        // Return an error response if the token is invalid or expired
        return NextResponse.json({ error: "Invalid JWT token" }, { status: 401 });
    }
}