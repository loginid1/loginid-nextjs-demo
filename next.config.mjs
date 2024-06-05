/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
        {
            source: '/(.*)',
            headers: [
            {
                key: 'X-Frame-Options',
                value: 'DENY',
            },
            {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
            },
            {
                key: 'X-XSS-Protection',
                value: '1; mode=block',
            },
            {
                key: 'Referrer-Policy',
                value: 'same-origin',
            },
            {
                key: "Access-Control-Allow-Origin",
                value: "*"
            },
            ],
        },
        ];
    },
};

export default nextConfig;
