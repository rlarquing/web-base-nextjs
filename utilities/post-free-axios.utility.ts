import axios from "axios";

export const postSinAuth = async (endpoint: string, bodyParams: any) => {
    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    try {
        let response = await axios.post(endpoint, bodyParams);
        if (response.status === 200 || response.status === 201) {
            let {data} = response;
            obj = data;
        }
        // console.log(data);
    } catch (error: any) {
        console.log("EL ERROR:", error);
        if (
            error.message.indexOf("Unauthorized") &&
            (error.message.indexOf(" 400") !== -1 ||
                error.message.indexOf(" 401") !== -1)
        ) {
            let data = await axios.post(endpoint, bodyParams);
            if (data.status === 200 || data.status === 201) {
                if (data.data.data.successStatus === true) {
                    msg = {
                        type: "info",
                        message: `Elemento insertado correctamente.`,
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
    return {msg, obj};
};