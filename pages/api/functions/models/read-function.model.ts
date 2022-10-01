import {ReadMenu} from "../../menus/models/read-menu.model";

export interface ReadFunction {
    dtoToString: string;
    id: number;
    nombre: string;
    descripcion: string;
    endPoints: any[];
    menu?: ReadMenu;
}