import type {NextApiRequest, NextApiResponse} from 'next'
import {logOut} from "./services/auth.service";

export default async function logout(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const respuesta = await logOut(req, res);
    res.status(respuesta.statusCode).json(respuesta)

}
