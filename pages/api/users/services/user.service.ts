import {get, patch, post, remove} from "../../../../utilities";
import {user} from "../endpoints/user.endpoint";
import {NextApiRequest, NextApiResponse} from "next";
import {Listado, Message, Response} from "../../../../models";
import {ListadoAdapter} from "../../../../adapters";
import {ReadUser} from "../models/read-user.model";
import {UserAdapter} from "../adapters/user.adapter";
import {MessageAdapter, ResponseAdapter} from "../../../../adapters";

export const findAll = async (req: NextApiRequest, res: NextApiResponse): Promise<Listado> => {
    const data = await get(req, res, user.list);
    return ListadoAdapter(data.obj);
}

export const findById = async (req: NextApiRequest, res: NextApiResponse, id: number): Promise<ReadUser | Message> => {
    const data = await get(req, res, user.get.replace('{id}', `${id}`));
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return UserAdapter(data.obj);
}

export const create = async (req: NextApiRequest, res: NextApiResponse, body: any): Promise<Response | Message> => {
    const data = await post(req, res, user.new, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const update = async (req: NextApiRequest, res: NextApiResponse, body: any): Promise<Response | Message> => {
    const data = await patch(req, res, user.edit, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse, id: number): Promise<Response | Message> => {
    const data = await remove(req, res, user.delete.replace('{id}', `${id}`));
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const deleteMultiple = async (req: NextApiRequest, res: NextApiResponse, ids: number[]): Promise<Response | Message> => {
    const data = await remove(req, res, user.delete_many, ids);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const changePassword = async (req: NextApiRequest, res: NextApiResponse, body: any): Promise<Response | Message> => {
    const data = await patch(req, res, user.change_password, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}
