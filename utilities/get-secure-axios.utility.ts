import axios from "axios";
import {api} from "./api.utility";
import {getObjCookie, setCookie} from "./auth-cookies.utility";
import {auth} from "../pages/api/auth/endpoints/auth.endpoint";

export const get = async (req: any, res: any, endpoint: string, params?: any): Promise<any> => {
    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    let response = null;
    let userDetails = JSON.parse(getObjCookie('userLogged', req));
    if (userDetails !== undefined && userDetails !== null) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
    }
    let message: string = "";
    try {
        if (params == undefined) {
            response = await axios.get(api() + endpoint);
        } else {
            response = await axios.get(api() + endpoint, {
                params: params
            });
        }
        if (response.status === 200 || response.status === 201) {
            let {data} = response;
            obj = data;
        } else {
            msg = {
                type: "error",
                message: `Error, no se ha podido completar su consulta.`,
            };
        }
    } catch (error: any) {
        if (error.message.indexOf("Unauthorized")) {
            if (userDetails !== undefined && userDetails !== null) {
                const refresh: string = userDetails.refreshToken;
                const respuesta = await axios.post(api() + auth.refresh, refresh);
                const userLogged = {
                    token: respuesta.data.accessToken,
                    refreshToken: respuesta.data.refreshToken
                }
                const datos:string = JSON.stringify(userLogged);
                setCookie('userLogged', res, datos);
                if (params == undefined) {
                    await get(req, res, endpoint);
                } else {
                    await get(req, res, endpoint, params);
                }
            }
        }
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 403") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.response.data.message;
            msg = {statusCode: error.response.data.statusCode, type: "error", message};
        }
    }
    return {msg, obj};
};