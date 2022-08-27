import axios from "axios";
import {getObjCookie, setCookie} from "./auth-cookies.utility";
import {api} from "./api.utility";
import {auth} from "../pages/api/auth/endpoints/auth.endpoint";

export const remove = async (req: any, res: any, endpoint: string, payload?: any): Promise<any> => {
    let msg = {}; //MENSAJES
    let data: any = null;
    let userDetails = JSON.parse(getObjCookie('userLogged', req));
    if (userDetails !== undefined && userDetails !== null) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
    }
    let message: string = "";
    try {
        if (payload === undefined) {
            data = await axios.delete(api() + endpoint);
        } else {
            data = await axios.delete(api() + endpoint, {
                data: payload,
            });
        }
        if (data.status === 200 || data.status === 201) {
            if (payload === undefined){
                msg = {
                    type: "info",
                    message: `Registro eliminado correctamente.`,
                };
            }else{
                msg = {
                    type: "info",
                    message: `Registros eliminados correctamente.`,
                };
            }
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
                const datos: string = JSON.stringify(userLogged);
                setCookie('userLogged', res, datos);
                if (payload == undefined) {
                    await remove(req, res, endpoint);
                } else {
                    await remove(req, res, endpoint, payload);
                }
            }
        }
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 403") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.response.data.message;
            msg = {statusCode: error.response.data.statusCode, type: "error", message};
        }
    }
    return {msg};
};