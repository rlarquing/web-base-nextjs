export const MessageAdapter = (obj: any) => ({
        statusCode: obj.statusCode,
        type: obj.type,
        message: obj.message,
});