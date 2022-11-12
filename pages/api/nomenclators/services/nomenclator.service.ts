import {get, patch, post, remove} from "../../../../utilities";
import {nomenclador} from "../endpoints/nomenclator.endpoint";
import {NextApiRequest, NextApiResponse} from "next";
import {Listado, Message, Response} from "../../../../models";
import {ListadoAdapter} from "../../../../adapters";
import {MessageAdapter, ResponseAdapter} from "../../../../adapters";
import {ReadNomenclador} from "../models/read-nomenclador.model";
import {NomencladorAdapter} from "../adapters/nomenclador.adapter";

export const findAll = async (req: NextApiRequest, res: NextApiResponse, name: string): Promise<Listado> => {
    const ruta: string = nomenclador.list.replace('{name}', name);
    const data = await get(req, res, ruta);
    return ListadoAdapter(data.obj);
}

export const findById = async (req: NextApiRequest, res: NextApiResponse, name: string, id: number): Promise<ReadNomenclador | Message> => {
    let ruta: string = nomenclador.get.replace('{name}', name);
    ruta = ruta.replace('{id}', `${id}`);
    const data = await get(req, res, ruta);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return NomencladorAdapter(data.obj);
}

export const create = async (req: NextApiRequest, res: NextApiResponse, name: string, body: any): Promise<Response | Message> => {
    const ruta: string = nomenclador.new.replace('{name}', name);
    const data = await post(req, res, ruta, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const update = async (req: NextApiRequest, res: NextApiResponse, name: string, id: number, body: any): Promise<Response | Message> => {
    let ruta: string = nomenclador.edit.replace('{name}', name);
    ruta = ruta.replace('{id}', `${id}`);
    const data = await patch(req, res, ruta, body);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    return ResponseAdapter(data.obj);
}

export const deleteNomenclador = async (req: NextApiRequest, res: NextApiResponse,name: string, id: number): Promise<Message> => {
    let ruta: string = nomenclador.delete.replace('{name}', name);
    ruta = ruta.replace('{id}', `${id}`);
    const data = await remove(req, res, ruta);
    return MessageAdapter(data.msg);

}

export const deleteMultiple = async (req: NextApiRequest, res: NextApiResponse, name:string, ids: number[]): Promise<Message> => {
    const ruta: string = nomenclador.delete_many.replace('{name}', name);
    const data = await remove(req, res, ruta, ids);

    return MessageAdapter(data.msg);
}

