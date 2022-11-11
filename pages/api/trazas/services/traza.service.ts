import {get, post, remove} from "../../../../utilities";
import {traza} from "../endpoints/traza.endpoint";
import {NextApiRequest, NextApiResponse} from "next";
import {Listado, Message, Response} from "../../../../models";
import {ListadoAdapter} from "../../../../adapters";
import {Traza} from "../models/traza.model";
import {TrazaAdapter} from "../adapters/traza.adapter";
import {MessageAdapter, ResponseAdapter} from "../../../../adapters";

export const findAll = async (req: NextApiRequest, res: NextApiResponse): Promise<Listado> => {
    const data = await get(req, res, traza.list);
    return ListadoAdapter(data.obj);
}

export const findById = async (req: NextApiRequest, res: NextApiResponse, id: number): Promise<Traza | Message> => {
    const data = await get(req, res, traza.get.replace('{id}', `${id}`));
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return TrazaAdapter(data.obj);
}

export const deleteTraza = async (req: NextApiRequest, res: NextApiResponse, id: number): Promise<Response | Message> => {
    const data = await remove(req, res, traza.delete.replace('{id}', `${id}`));
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const filtrar = async (req: NextApiRequest, res: NextApiResponse, body: any): Promise<Response | Message> => {
    const data = await post(req, res, traza.filter, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}
