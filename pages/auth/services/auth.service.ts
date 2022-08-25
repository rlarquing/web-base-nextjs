import {AuthCredentials, SecretData} from "../models";
import {exchange, post, postSinAuth} from "../../../utilities";
import endpoint from '../endpoints/auth.endpoint';
import {SecretDataAdapter} from "../adapters/secret-data.adapter";
import {Message} from "../../../models";
import {MessageAdapter} from "../../../adapters";

export const signIn = async (authCredentials: AuthCredentials): Promise<SecretData> => {
    const data = await postSinAuth(endpoint.auth.login, authCredentials);
    return SecretDataAdapter(data.obj);
}

export const regenerateTokens = async (): Promise<SecretData> => {
    const data = await exchange(endpoint.auth.refresh);
    return SecretDataAdapter(data.obj);
}

export const logout = async (): Promise<Message> => {
    const data = await post(endpoint.auth.logout);
    return MessageAdapter(data.msg);
}