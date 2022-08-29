import type {NextApiRequest, NextApiResponse} from 'next'
import {logOut} from "./services/auth.service";

export default async function logout(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await logOut(req, res);
    res.writeHead(302, { Location: '/' });
    res.end();

}
