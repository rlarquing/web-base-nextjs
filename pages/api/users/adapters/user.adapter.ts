import {ReadUser} from "../models/read-user.model";

export const UserAdapter = (obj: any): ReadUser => ({
    dtoToString: obj.dtoToString,
    id: obj.id,
    username: obj.username,
    email: obj.email,
    roles: obj.roles,
    funcions: obj.funcions,
});
