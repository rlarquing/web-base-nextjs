// import Localbase from "localbase";
import Dexie, { Table } from 'dexie';
import {Menu} from "./menu";
/*
 * Importamos las tablas de la base de datos.
 */

export class MyDexie extends Dexie {
   menu!: Table<Menu>;
   constructor() {
      super('api-base');
      this.version(1).stores({
         menu: "++id, label, icon, to, menus, tipo, menuPadre",
      });
   }
}

export const db = new MyDexie();

