import { NextRequest, NextResponse } from "next/server";
import { default as jwt } from "jsonwebtoken"
import { loginidValidateJwt } from "@/app/lib/loginid";
import db from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";


export async function GET(
    req: NextRequest,
    res: NextResponse,
) {
    const { jwtAccess } = await req.json();

    try {
        const decodedJwt = jwt.decode(jwtAccess);
        loginidValidateJwt(jwtAccess, decodedJwt.iss);

        const user = db.data.users.find(user => user.username === decodedJwt.username);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        db.data.sessions.push({
            uid: uuidv4(),
            username: decodedJwt.username
        });
        db.write();

        return NextResponse.json({ message: "JWT token is valid" });
    } catch (error) {
        console.log(error);
        // Return an error response if the token is invalid or expired
        return NextResponse.json({ error: "Invalid JWT token" }, { status: 401 });
    }
}