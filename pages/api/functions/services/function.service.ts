import {get, patch, post, remove} from "../../../../utilities";
import {funcion} from "../endpoints/function.endpoint";
import {NextApiRequest, NextApiResponse} from "next";
import {Listado, Message, Response} from "../../../../models";
import {ListadoAdapter} from "../../../../adapters";
import {ReadFunction} from "../models/read-function.model";
import {FunctionAdapter} from "../adapters/function.adapter";
import {MessageAdapter, ResponseAdapter} from "../../../../adapters";

export const findAll = async (req: NextApiRequest, res: NextApiResponse): Promise<Listado> => {
    const data = await get(req, res, funcion.list);
    return ListadoAdapter(data.obj);
}

export const findById = async (req: NextApiRequest, res: NextApiResponse, id: number): Promise<ReadFunction | Message> => {
    const data = await get(req, res, funcion.get.replace('{id}', `${id}`));
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return FunctionAdapter(data.obj);
}

export const create = async (req: NextApiRequest, res: NextApiResponse, body: any): Promise<Response | Message> => {
    const data = await post(req, res, funcion.new, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const update = async (req: NextApiRequest, res: NextApiResponse, body: any): Promise<Response | Message> => {
    const data = await patch(req, res, funcion.edit, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const deleteFunction = async (req: NextApiRequest, res: NextApiResponse, id: number): Promise<Response | Message> => {
    const data = await remove(req, res, funcion.delete.replace('{id}', `${id}`));
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const deleteMultiple = async (req: NextApiRequest, res: NextApiResponse, ids: number[]): Promise<Response | Message> => {
    const data = await remove(req, res, funcion.delete_many, ids);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}
