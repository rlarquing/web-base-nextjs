import {serialize, parse} from 'cookie';

export const setCookie = (cookieName:string, res: any, dato: string): void => {
    const cookie = serialize(cookieName, dato, {
        maxAge: 3600,
        expires: new Date(Date.now() + 3600 * 1000),
        httpOnly: true,
        secure: process.env.APP_ENV === 'production',
        path: '/',
        sameSite: 'strict',
    })

    res.setHeader('Set-Cookie', cookie)
}

export const removeCookie = (cookieName:string, res: any): void => {
    const cookie = serialize(cookieName, '', {
        maxAge: 0,
        expires: new Date(Date.now() + 3600 * 1000),
        httpOnly: true,
        secure: process.env.APP_ENV === 'production',
        path: '/',
        sameSite: 'strict',
    })

    res.setHeader('Set-Cookie', cookie)
}

export const parseCookies = (req: any): any => {
    // For API Routes we don't need to parse the cookies.
    if (req.cookies) return req.cookies

    // For pages we do need to parse the cookies.
    const cookie = req.headers?.cookie
    return parse(cookie || '')
}

export const getObjCookie = (nameObj:string, req: any): string => {
    const cookies = parseCookies(req)
    return cookies[nameObj]
}