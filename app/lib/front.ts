export async function submitLoginToken(jwtAccess: string) {
    const authenticationResult = await fetch('/api/login/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jwtAccess }),
    });

    if (!authenticationResult.ok) {
        throw new Error("Failed to authenticate");
    }
}

export async function submitRegisterToken(jwtAccess: string) {
    const authenticationResult = await fetch('/api/register/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jwtAccess }),
    });

    if (!authenticationResult.ok) {
        throw new Error("Failed to authenticate");
    }
}