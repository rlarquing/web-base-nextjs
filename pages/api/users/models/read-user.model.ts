import {ReadRol} from "../../rols/models/read-rol.model";
import {ReadFunction} from "../../functions/models/read-function.model";

export interface ReadUser{
    dtoToString: string;
    id: number;
    username: string;
    email: string;
    roles: ReadRol[];
    funcions: ReadFunction[];
}