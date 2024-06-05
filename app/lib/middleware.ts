import db, { Session } from "./db";
import { v4 as uuidv4 } from "uuid";
import { NextRequest } from "next/server";

export const getSession = async (req: NextRequest): Promise<Session| null> => {
    const sessionId = req.cookies.get("session");
    if (!sessionId) {
        return null;
    }

    const sessionInst = db.data.sessions.find((sessionInst) => sessionInst.uid === sessionId.value);
    return sessionInst || null;
}

export const saveSession = (username: string, token: string): string => {
    const uid = uuidv4();
    db.data.sessions.push({
        uid,
        token,
        username
    });
    db.write();

    return uid;
}