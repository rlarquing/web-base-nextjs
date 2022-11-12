import type {NextApiRequest, NextApiResponse} from 'next'
import {deleteMultiple} from "./services/nomenclator.service";
export default async function removeMultiple(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const respuesta = await deleteMultiple(req, res, req.body.name, req.body.ids);
    res.status(200).json(respuesta)

}
