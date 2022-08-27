import axios from "axios";
import {api} from "./api.utility";
import {auth} from "../pages/api/auth/endpoints/auth.endpoint";
import {getObjCookie, setCookie} from "./auth-cookies.utility";

export const edit = async (req: any, res: any, endpoint: string, bodyParams: any) => {
    let msg = {}; //MENSAJES
    let userDetails = JSON.parse(getObjCookie('userLogged', req));
    if (userDetails !== undefined && userDetails !== null) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
    }
    let message: string = "";
    try {
        let data = await axios.patch(api() + endpoint, bodyParams);
        if (data.status === 200 || data.status === 201) {
            if (data.data.successStatus === true) {
                msg = {
                    type: "info",
                    message: `Elemento actualizado correctamente.`,
                };
            } else {
                msg = {
                    type: "error",
                    message: data.data.message,
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
                await edit(req, res, endpoint, bodyParams);
            }
        }
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 403") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.response.data.message;
            msg = {statusCode: error.response.data.statusCode, type: "error", message};
        }
    }
    return {msg};
};