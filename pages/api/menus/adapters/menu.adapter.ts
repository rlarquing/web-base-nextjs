import {ReadMenu} from "../models/read-menu.model";

export const MenuAdapter = (obj: any): ReadMenu => ({
    dtoToString: obj.dtoToString,
    id: obj.id,
    label: obj.label,
    icon: obj.icon,
    to: obj.to,
    menuPadre: obj.menuPadre,
    menu: obj.menu === undefined ? null : obj.menu,
    menus: obj.menus,
    tipo: obj.tipo
});
