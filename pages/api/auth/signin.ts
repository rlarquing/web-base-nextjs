import type {NextApiRequest, NextApiResponse} from 'next'
import {signIn} from "./services/auth.service";
export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const respuesta = await signIn(req, res, req.body);
    res.status(respuesta.statusCode).json(respuesta)

}
