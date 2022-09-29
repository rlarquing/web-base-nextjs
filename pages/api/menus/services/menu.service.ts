import {getSinAuth} from "../../../../utilities";
import {menu} from "../endpoints/menu.endpoint";
import ReadMenuAdapter from "../adapters";
import {ReadMenu} from "../models/read-menu.model";

export const tipoMenu = async (tipo: string): Promise<ReadMenu[]> => {
    const data = await getSinAuth(menu.tipo.replace('{tipo}', tipo));
    return data.obj.map((menu: any) => ReadMenuAdapter(menu));
}