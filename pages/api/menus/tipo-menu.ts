import type {NextApiRequest, NextApiResponse} from 'next'
import {tipoMenu} from "./services/menu.service";
export default async function TipoMenu(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('estoy aca')
    const respuesta = await tipoMenu(req, res,'reporte');
    res.status(200).json(respuesta)

}