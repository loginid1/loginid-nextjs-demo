This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setup

1. Register LoginID account https://dashboard.loginid.io/login
2. Login to dashboard, and create new application
3. Once you have created application, navigated to the settings and add new application key.
4. Copy BaseURL, AppID, and newly created KeyID into the `.env`
5. Run app with `npm run dev`

Note: If you are having CORS issues, check dashboard, and ensure that allowed origins contain your application origin, including protocol, and port (e.g. http://localhost:3000)

## License

This project is under Apache 2.0. See [LICENSE.md](./LICENSE.md)
