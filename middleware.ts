import {NextResponse} from 'next/server';
import {auth} from "./pages/auth/routers/auth.router";
import {menus as menuApi} from "./pages/api/menus/routers/menu.router";

export function middleware(request: any) {
    const userLogged = request.cookies.get('userLogged');
    const menus = request.cookies.get('menus');
    if (request.nextUrl.pathname.includes(auth.signin) || request.nextUrl.pathname.includes(menuApi.tipoMenu)) {
        return NextResponse.next();
    }
    if (!request.nextUrl.pathname.includes('/_')) {
        if (menus !== undefined) {
            for (const menu of menus) {
                if (request.nextUrl.pathname.includes(menu.to)) {
                    if (userLogged === undefined && menu.tipo === 'interno') {
                        return NextResponse.redirect(new URL(auth.signin, request.url));
                    }
                }
            }
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL(auth.signin, request.url));
        }
    }
}