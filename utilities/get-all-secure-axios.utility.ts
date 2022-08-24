import axios from "axios";
import cookie from "cookie"
export const getAll = async (endpoint: string, bodyParams: any) => {
    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    let userDetails = cookie.parse("userLogged");
    if (userDetails !== undefined && userDetails !== null) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
    }
    try {
        const response = await axios.get(endpoint, bodyParams);
        if (response.status === 200 || response.status === 201) {
            let {data} = response;
            if (
                data !== undefined &&
                data.data !== undefined &&
                data.data.data !== undefined &&
                data.data.data.items !== undefined
            ) {
                obj = data.data;
            } else if (
                data !== undefined &&
                data.data !== undefined &&
                data.data.items !== undefined
            ) {
                obj = data;
            } else if (data !== undefined && data.items !== undefined) {
                obj = data;
            } else {
                obj = data;
            }
        } else {
            msg = {
                type: "error",
                message: `Error, no se ha podido completar su consulta.`,
            };
        }
    } catch (error: any) {
        if (
            error.message.indexOf("Unauthorized") &&
            (error.message.indexOf(" 400") !== -1 ||
                error.message.indexOf(" 401") !== -1)
        ) {
            //Store.dispatch("auth/refresh");
            const response = await axios.get(endpoint, bodyParams);
            if (response.status === 200 || response.status === 201) {
                let {data} = response;
                if (
                    data !== undefined &&
                    data.data !== undefined &&
                    data.data.data !== undefined &&
                    data.data.data.items !== undefined
                ) {
                    obj = data.data;
                } else if (
                    data !== undefined &&
                    data.data !== undefined &&
                    data.data.items !== undefined
                ) {
                    obj = data;
                } else if (data !== undefined && data.items !== undefined) {
                    obj = data;
                } else {
                    obj = data;
                }
            } else {
                msg = {
                    type: "error",
                    message: `Error, no se ha podido completar su consulta.`,
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
                    message: `Error, ha ocurrido un error inesperado, contacte el Administrador.`,
                };
            }
        }
    }
    return {msg, obj};
};