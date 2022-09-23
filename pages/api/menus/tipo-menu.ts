import type {NextApiRequest, NextApiResponse} from 'next'
import {tipoMenu} from "./services/menu.service";
export default async function TipoMenu(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const reportes = await tipoMenu(req, res,'reporte');
    const graficos = await tipoMenu(req, res,'grafico');
    const respuesta = reportes.concat(graficos);
    res.status(200).json(respuesta)

}