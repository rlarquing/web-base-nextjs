import {AuthCredentials} from "../models";
import {auth} from '../endpoints/auth.endpoint';
import {postSinAuth, removeCookie, addCookie} from "../../../../utilities";
import {Message} from "../../../../models";
import {MessageAdapter} from "../../../../adapters";
import {NextApiRequest, NextApiResponse} from "next";


export const signIn = async (req: NextApiRequest, res: NextApiResponse, authCredentials: AuthCredentials): Promise<any> => {
    const data: any = await postSinAuth(auth.login, authCredentials);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    const userLogged = {
        token: data.obj.accessToken,
        refreshToken: data.obj.refreshToken
    }
    const menusDto: any[]=[];
    for (const menu of data.obj.menus) {
        menusDto.push({
            to: menu.to,
            tipo: menu.tipo
        })
    }
    if (data.obj.menus.length>0){
        const menus: string = JSON.stringify(menusDto);
        addCookie('menus', menus, res, req);

        const datos: string = JSON.stringify(userLogged);
        addCookie('userLogged', datos, res,req);
    }

    return {statusCode: 200, menu: data.obj.menus};
}

export const logOut = async (req: NextApiRequest, res: NextApiResponse): Promise<Message> => {
    const data = await postSinAuth(auth.logout);
    removeCookie('userLogged', res, req);
    removeCookie('menus', res, req);
    return MessageAdapter(data.msg);
}