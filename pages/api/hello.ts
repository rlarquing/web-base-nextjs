// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {signIn} from "../auth/services/auth.service";
type Data = {
  data: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const body = {
    username: 'juan',
    password: 'Qwerty1234*',
  }
  const respuesta = await signIn(body,'http://localhost:3000/api/');

  res.status(200).json({data: respuesta})
}
