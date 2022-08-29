import type {NextApiRequest, NextApiResponse} from 'next'
import {getObjCookie} from "../../../utilities";

export default async function isAutenticated(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(res);
   //const userLogged= getObjCookie('userLogged',req);
    res.status(200).json({data: 'hola'})

}
