export const MessageAdapter = (obj: any) => ({
        type: obj.data.type,
        message: obj.data.message,
});