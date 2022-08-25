export const SecretDataAdapter = (obj: any) => ({
    accessToken: obj.data.accessToken,
    refreshToken: obj.data.refreshToken,
    functions:  obj.data.functions,
    menus:  obj.data.menus
});