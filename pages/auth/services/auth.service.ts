import {AuthCredentials, SecretData} from "../models";
import {api, exchange, post, postSinAuth} from "../../../utilities";
import {auth} from '../endpoints/auth.endpoint';
import {SecretDataAdapter} from "../adapters/secret-data.adapter";
import {Message} from "../../../models";
import {MessageAdapter} from "../../../adapters";


export const signIn = async (authCredentials: AuthCredentials, api: string): Promise<SecretData> => {
    const enpoint: string = api + auth.login;
    const data: any = await postSinAuth(enpoint, authCredentials);
    if (data.msg.type !== "error") {
        console.log('mensaje',data.msg);
    } else {
        throw new Error(await data.msg.message)
    }
    return SecretDataAdapter(data.obj);
}

export const regenerateTokens = async (): Promise<SecretData> => {
    let api = process.env.API_URL;
    const data = await exchange(api + auth.refresh);
    return SecretDataAdapter(data.obj);
}

export const logout = async (): Promise<Message> => {
    let api = process.env.API_URL;
    const data = await post(api + auth.logout);
    return MessageAdapter(data.msg);
}