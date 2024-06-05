const keyid = process.env.API_KEY
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function loginidValidateJwt(jwtAccess: string, iss: string) {
    const encodedCredential = Buffer.from(keyid + ':').toString('base64');

    // TODO fix baseUrl and verify
    const response = await fetch(baseUrl + '/fido2/v2/mgmt/token/verify', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + encodedCredential,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jwtAccess }),
    });

    if (!response.ok) {
        throw new Error("Failed to validate JWT token");
    }
}

    