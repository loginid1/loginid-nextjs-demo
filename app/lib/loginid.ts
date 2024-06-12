import { default as jwt } from "jsonwebtoken"

const keyid = process.env.API_KEY
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function loginidValidateJwt(jwtAccess: string) {
    const decodedJwt = jwt.decode(jwtAccess);
    if (!decodedJwt) {
        throw new Error("Failed to decode JWT token");
    }

    if (decodedJwt.iss !== baseUrl) {
        throw new Error("Invalid JWT token issuer");
    }
    
    // Encoding basic authorization
    const encodedCredential = Buffer.from(keyid + ":").toString("base64");

    // We can obtaine the verify endpoint from the decoded JWT token, using the iss and verify fields
    const response = await fetch(decodedJwt.iss + decodedJwt.verify, {
        method: "POST",
        headers: {
            "Authorization": "Basic " + encodedCredential,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwtAccess }),
    });

    if (!response.ok) {
        throw new Error("Failed to validate JWT token");
    }
}
