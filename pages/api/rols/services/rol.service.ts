import {get, patch, post, remove} from "../../../../utilities";
import {rol} from "../endpoints/rol.endpoint";
import {NextApiRequest, NextApiResponse} from "next";
import {Listado, Message, Response} from "../../../../models";
import {ListadoAdapter} from "../../../../adapters";
import {ReadRol} from "../models/read-rol.model";
import {RolAdapter} from "../adapters/rol.adapter";
import {MessageAdapter, ResponseAdapter} from "../../../../adapters";

export const findAll = async (req: NextApiRequest, res: NextApiResponse): Promise<Listado> => {
    const data = await get(req, res, rol.list);
    return ListadoAdapter(data.obj);
}

export const findById = async (req: NextApiRequest, res: NextApiResponse, id: number): Promise<ReadRol | Message> => {
    const data = await get(req, res, rol.get.replace('{id}', `${id}`));
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return RolAdapter(data.obj);
}

export const create = async (req: NextApiRequest, res: NextApiResponse, body: any): Promise<Response | Message> => {
    const data = await post(req, res, rol.new, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const update = async (req: NextApiRequest, res: NextApiResponse, body: any): Promise<Response | Message> => {
    const data = await patch(req, res, rol.edit, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const deleteRol = async (req: NextApiRequest, res: NextApiResponse, id: number): Promise<Response | Message> => {
    const data = await remove(req, res, rol.delete.replace('{id}', `${id}`));
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const deleteMultiple = async (req: NextApiRequest, res: NextApiResponse, ids: number[]): Promise<Response | Message> => {
    const data = await remove(req, res, rol.delete_many, ids);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}
