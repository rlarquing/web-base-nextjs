import type {NextApiRequest, NextApiResponse} from 'next'
import {findAll} from "./services/user.service";
export default async function index(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = await findAll(req,res)
    res.status(200).json(data)
}