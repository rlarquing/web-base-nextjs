import axios from "axios";
import cookie from "cookie"
export const remove = async (endpoint: string) => {
    let msg = {}; //MENSAJES
    try {
        let userDetails = cookie.parse("userLogged");
        if (userDetails !== undefined && userDetails !== null) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
        }
        let data = await axios.delete(endpoint);
        if (data.status === 200 || data.status === 201) {
            msg = {
                type: "info",
                message: `Registro eliminado correctamente.`,
            };
        }
    } catch (error: any) {
        if (
            error.message.indexOf("Unauthorized") &&
            (error.message.indexOf(" 400") !== -1 ||
                error.message.indexOf(" 401") !== -1)
        ) {
            // Store.dispatch("auth/refresh");
            let userDetails = cookie.parse("userLogged");
            if(userDetails !== undefined && userDetails !== null){
                axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
            }
            let data = await axios.delete(endpoint);
            if (data.status === 200 || data.status === 201) {
                msg = {
                    type: "info",
                    message: `Registro eliminado correctamente.`,
                };
            } else {
                msg = {
                    type: "error",
                    message: `Error, no se ha podido eliminar el elemento.`,
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
    return {msg};
};