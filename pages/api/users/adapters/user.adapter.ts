export const UserAdapter = (obj: any) => ({
    dtoToString: obj.dtoToString,
    id: obj.id,
    username: obj.username,
    email: obj.email,
    roles: obj.roles,
    funcions: obj.funcions,
});