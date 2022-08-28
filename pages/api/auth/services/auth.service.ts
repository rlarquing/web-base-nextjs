import {AuthCredentials} from "../models";
import {auth} from '../endpoints/auth.endpoint';
import {postSinAuth, setCookie,removeCookie} from "../../../../utilities";
import {Message} from "../../../../models";
import {MessageAdapter} from "../../../../adapters";
import {NextApiRequest, NextApiResponse} from "next";

export const signIn = async (req: NextApiRequest, res: NextApiResponse, authCredentials: AuthCredentials): Promise<any> => {
    const data: any = await postSinAuth(req, res, auth.login, authCredentials);
    if (data.msg.type === "error") {
        return MessageAdapter(data.msg);
    }
    const userLogged = {
        token: data.obj.accessToken,
        refreshToken: data.obj.refreshToken
    }
    const datos: string = JSON.stringify(userLogged);
    setCookie('userLogged', res, datos);
    return {statusCode: 200, menu: data.obj.menus};
}

export const logOut = async (req: NextApiRequest, res: NextApiResponse): Promise<Message> => {
    const data = await postSinAuth(req, res, auth.logout);
    removeCookie('userLogged', res);
    return MessageAdapter(data.msg);
}