import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
    message: string
}
 
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    res.status(200).json({ message: 'Hello from Next.js!' })
}