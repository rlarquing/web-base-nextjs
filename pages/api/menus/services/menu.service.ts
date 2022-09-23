import {NextApiRequest, NextApiResponse} from "next";
import {getSinAuth} from "../../../../utilities";
import {menu} from "../endpoints/menu.endpoint";
import ReadMenuAdapter from "../adapters";
import {ReadMenu} from "../models/read-menu.model";

export const tipoMenu = async (req: NextApiRequest, res: NextApiResponse, tipo: string): Promise<ReadMenu[]> => {
    const data = await getSinAuth(req, res, menu.tipo.replace('{tipo}', tipo));
    const readMenu: ReadMenu[] = data.obj.map((menu: any)=>ReadMenuAdapter(menu))
    return readMenu;
}