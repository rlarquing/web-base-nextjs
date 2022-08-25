import axios from "axios";
import cookie from "cookie"
export const exchange = async (endpoint: string, bodyParams?: any) => {
    let msg: any = {}; //MENSAJES
    let obj: any = {}; //OBJETOS
    let response: any = null;
    let userDetails = cookie.parse("userLogged");
    if (userDetails !== undefined && userDetails !== null) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + userDetails.token;
    }
    let message: string = "";
    try {
        if (bodyParams == undefined) {
            response = await axios.post(endpoint);
        } else {
            response = await axios.post(endpoint, bodyParams);
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
            message = `Usuario sin autorización.`;
            msg = {type: "error", message};
        }
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 401") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.message;
            msg = {type: "error", message};
        }
    }
    return {msg, obj};
};