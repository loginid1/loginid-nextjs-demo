import { NextRequest, NextResponse } from "next/server";
import { default as jwt } from "jsonwebtoken"
import { loginidValidateJwt } from "@/app/lib/loginid";
import db from "@/app/lib/db";
import { saveSession } from "@/app/lib/middleware";

export async function POST(
    req: NextRequest,
) {
    const { jwtAccess } = await req.json();

    try {
        
        const decodedJwt = jwt.decode(jwtAccess);
        loginidValidateJwt(jwtAccess, decodedJwt.iss);

        const user = db.data.users.find(user => user.username === decodedJwt.username);
        if (user) {
            return NextResponse.json({ error: "User already exists!" }, { status: 401 });
        }

        db.data.users.push({
            username: decodedJwt.username
        });
        db.write();

        const res = NextResponse.json({ message: "JWT token is valid" }, { status: 200 });
        const sessionId = saveSession(decodedJwt.username, jwtAccess);

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