import axios from "axios";

export const getSinAuth = async (endpoint: string) => {
    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    try {
        const response = await axios.get(endpoint);
        if (response.status === 200) {
            let { data } = response;
            obj = data;
        } else {
            msg = {
                type: "error",
                message: `Error, no se ha podido completar su consulta.`,
            };
        }
    } catch (error) {

        msg = {
            type: "error",
            message: `Error, no se ha podido completar su consulta. ${error}`,
        };
    }
    return {msg, obj};
};