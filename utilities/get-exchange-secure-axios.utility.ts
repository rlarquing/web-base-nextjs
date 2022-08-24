import axios from "axios";
import cookie from "cookie"
export const getExchange = async (endpoint: string, bodyParams: any) => {
    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    try {
        let userDetails = cookie.parse("userLogged");
        if (userDetails !== undefined && userDetails !== null) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
        }
        const response = await axios.get(endpoint, bodyParams);
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
            let userDetails = cookie.parse("userLogged");
            if (userDetails !== undefined && userDetails !== null) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
            }
            const response = await axios.get(endpoint, bodyParams);
            if (response.status === 200 || response.status === 201) {
                let {data} = response;
                obj = data;
            } else {
                msg = {
                    type: "error",
                    message: `Error, no se ha podido completar su consulta.`,
                };
            }
        } else {
            let message = "";
            error.message.indexOf(" 500") !== -1
                ? (message = `Error, fallo del servidor.`)
                : (message = `Error, no se ha podido registrar en el sistema.`);
            msg = {type: "error", message};
        }
    }
    return {msg, obj};
};