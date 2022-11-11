import {ReadFunction} from "../models/read-function.model";

export const FunctionAdapter = (obj: any): ReadFunction => ({
    dtoToString: obj.dtoToString,
    id: obj.id,
    nombre: obj.nombre,
    descripcion: obj.descripcion,
    endPoints: obj.endPoints,
    menu: obj.menu === undefined ? null : obj.menu,
});
