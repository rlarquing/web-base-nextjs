import axios from "axios";
import cookie from "cookie"

export const edit = async (endpoint: string, bodyParams: any) => {
    let msg = {}; //MENSAJES
    try {
        let userDetails = cookie.parse("userLogged");
        if (userDetails !== undefined && userDetails !== null) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;

        }
        let data = await axios.patch(endpoint, bodyParams);
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
        // console.log(data);
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
            let data = await axios.patch(endpoint, bodyParams);
            if (data.status === 200 || data.status === 201) {
                if (data.data.data.successStatus === true) {
                    msg = {
                        type: "info",
                        message: `Elemento actualizado correctamente.`,
                    };
                } else {
                    msg = {
                        type: "error",
                        message: data.data.data.message,
                    };
                }
            }
        } else {
            let message = "";
            error.message.indexOf(" 500") !== -1
                ? (message = `Error, fallo del servidor.`)
                : (message = `Error, no se ha podido registrar en el sistema.`);
            msg = {type: "error", message};
        }
    }
    return {msg};
};