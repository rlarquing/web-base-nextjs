import {get, getSinAuth, patch, post, remove} from "../../../../utilities";
import {NextApiRequest, NextApiResponse} from "next";
import {Listado, Message, Response} from "../../../../models";
import {menu} from "../endpoints/menu.endpoint";
import {ListadoAdapter} from "../../../../adapters";
import {ReadMenu} from "../models/read-menu.model";
import {MessageAdapter, ResponseAdapter} from "../../../../adapters";
import {MenuAdapter} from "../adapters/menu.adapter";

export const tipoMenu = async (tipo: string): Promise<ReadMenu[]> => {
    const data = await getSinAuth(menu.tipo.replace('{tipo}', tipo));
    return data.obj.map((menu: any) => MenuAdapter(menu));
}

export const findAll = async (req: NextApiRequest, res: NextApiResponse): Promise<Listado> => {
    const data = await get(req, res, menu.list);
    return ListadoAdapter(data.obj);
}

export const findById = async (req: NextApiRequest, res: NextApiResponse, id: number): Promise<ReadMenu | Message> => {
    const data = await get(req, res, menu.get.replace('{id}', `${id}`));
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return MenuAdapter(data.obj);
}

export const create = async (req: NextApiRequest, res: NextApiResponse, body: any): Promise<Response | Message> => {
    const data = await post(req, res, menu.new, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const update = async (req: NextApiRequest, res: NextApiResponse, body: any): Promise<Response | Message> => {
    const data = await patch(req, res, menu.edit, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const deleteMenu = async (req: NextApiRequest, res: NextApiResponse, id: number): Promise<Response | Message> => {
    const data = await remove(req, res, menu.delete.replace('{id}', `${id}`));
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const deleteMultiple = async (req: NextApiRequest, res: NextApiResponse, ids: number[]): Promise<Response | Message> => {
    const data = await remove(req, res, menu.delete_many, ids);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}
