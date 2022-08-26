import axios from "axios";

export const postSinAuth = async (endpoint: string, bodyParams: any) => {
    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    let message: string = "";
    try {
        let response = await axios.post(endpoint, bodyParams);
        if (response.status === 200 || response.status === 201) {
            let {data} = response;
            obj = data;
        }
    } catch (error: any) {
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 401") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.message;
            msg = {type: "error", message};
        }
    }
    return {msg, obj};
};