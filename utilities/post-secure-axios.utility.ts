import axios from "axios";
import cookie from "cookie"

export const post = async (endpoint: string, bodyParams?: any) => {
    let msg: any = {}; //MENSAJES
    let data: any = null;
    let userDetails = cookie.parse("userLogged");
    if (userDetails !== undefined && userDetails !== null) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
    }
    let message: string = "";
    try {
        if (bodyParams == undefined) {
            data = await axios.post(endpoint);
        } else {
            data = await axios.post(endpoint, bodyParams);
        }
        if (data.status === 200 || data.status === 201) {
            if (data.data.successStatus === true) {
                msg = {
                    type: "info",
                    message: `Elemento insertado correctamente.`,
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
            message = `Usuario sin autorización.`;
            msg = {type: "error", message};
        }
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 401") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.message;
            msg = {type: "error", message};
        }
    }
    return {msg};
};