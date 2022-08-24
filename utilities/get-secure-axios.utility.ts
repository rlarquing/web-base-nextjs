import axios from "axios";
import cookie from "cookie"
export const get = async (endpoint: string) => {

    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    let userDetails = cookie.parse("userLogged");
    if (userDetails !== undefined && userDetails !== null) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
    }
    try {
        const response = await axios.get(endpoint);
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
        if (
            error.message.indexOf("Unauthorized") &&
            (error.message.indexOf(" 400") !== -1 ||
                error.message.indexOf(" 401") !== -1)
        ) {
            const response = await axios.get(endpoint);
            if (response.status === 200 || response.status === 201) {
                let {data} = response;
                obj = data;
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