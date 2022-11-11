import {Traza} from "../models/traza.model";

export const TrazaAdapter = (obj: any): Traza => ({
    id: obj.id,
    user: obj.user,
    date: obj.date,
    model: obj.model,
    data: obj.data,
    action: obj.action,
    record: obj.record,
});
