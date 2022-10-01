import {ReadFunction} from "../../functions/models/read-function.model";

export interface ReadRol {
    dtoToString: string;
    id: number;
    nombre: string;
    descripcion: string;
    funcions: ReadFunction[];
}