export interface Menu {
    id?: number;
    label: string;
    icon: string;
    to: string;
    menus: any[];
    tipo: string;
    menuPadre: string
}

export class AccionesMenu {
    private database: any;

    constructor(database: any) {
        this.database = database;
    }

    public add = async (data: any) => {
        let id = await this.database.menu.where({id: data.id}).first();
        let men = {
            id: data.id,
            label: data.label,
            icon: data.icon,
            to: data.to,
            menus: data.menus,
            tipo: data.tipo,
            menuPadre: data.menuPadre
        };
        if (id === undefined) {
            this.database.menu.add(men);
        } else {
            this.database.menu.put(men);
        }
    };

    public addAll = async (data: any[]) => {
        this.database.open().then(async () => {
            for (let element of data) {
                let id = await this.database.menu.where({id: element.id}).first();
                if (id === undefined) {
                    await this.add(element);
                } else {
                    this.update(id, element)
                }
            }
        }).catch((err: any) => {
            console.log(err);
        });
    };

    public get = async (id: number) => {
        return await this.database.get(id);
    };

    public getMenuByRoute = async (to: string) => {
        return this.database.menu.where({to}).first();
    };

    public getAll = async () => {
        return await this.database.menu.toArray();
    };

    public replace = (id: number, data: any) => {
        let men = {
            id: data.id,
            label: data.label,
            icon: data.icon,
            to: data.to,
            menus: data.menus,
            tipo: data.tipo,
            menuPadre: data.menuPadre
        };
        this.database.menu.where({id: id}).put(men);
    };

    public delete = (id: number) => {
        this.database.where({id: id}).delete();
    };

    public deleteAll = async () => {
        const menu: any = await this.getAll()
        menu.forEach((item: any) => {
            this.delete(item.id);
        });
    };

    public update = (id: number, data: any) => {
        let men = {
            id: data.id,
            label: data.label,
            icon: data.icon,
            to: data.to,
            menus: data.menus,
            tipo: data.tipo,
            menuPadre: data.menuPadre
        };
        this.database.menu.where({id: id}).update(men);
    };
}

