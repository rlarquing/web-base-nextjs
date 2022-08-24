import axios from "axios";
import cookie from "cookie"
export const search = async (endpoint: string, bodyParams: any, params: any) => {
    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    try {
        let userDetails = cookie.parse("userLogged");
        if (userDetails !== undefined && userDetails !== null) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
        }
        let data = await axios.post(endpoint, bodyParams, params);
        if (data.status === 200 || data.status === 201) {
            if (data.data.items !== undefined) {
                obj = data;
            } else {
                obj = data.data;
            }
        }
    } catch (error: any) {
        if (
            error.message.indexOf("Unauthorized") &&
            (error.message.indexOf(" 400") !== -1 ||
                error.message.indexOf(" 401") !== -1)
        ) {
            //   Store.dispatch("auth/refresh");
            let userDetails = cookie.parse("userLogged");
            if (userDetails !== undefined && userDetails !== null) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
            }
            let data = await axios.post(endpoint, bodyParams, params);
            if (data.status === 200 || data.status === 201) {
                if (data.data.items !== undefined) {
                    obj = data;
                } else {
                    obj = data.data;
                }
            } else {
                msg = {
                    type: "error",
                    message: `Error, conexión con el servidor fallida.`,
                };
            }
        } else if (error.message.indexOf(" 403") !== -1) {
            msg = {
                type: "error",
                message: `Error, Acceso denegado!.`,
            };
        } else {
            if (
                error.response !== undefined &&
                error.response.data !== undefined &&
                error.response.data.message !== undefined
            ) {
                msg = {
                    type: "error",
                    message: `Error, ${error.response.data.message}.`,
                };
            } else {
                msg = {
                    type: "error",
                    message: `Error, no econtró ningún registro.`,
                };
            }
        }
    }
    return {msg, obj};
};