import {NextResponse} from 'next/server';
import {auth} from "./pages/auth/routers/auth.router";

export function middleware(request: any) {
    const userLogged = request.cookies.get('userLogged');
    const menus = request.cookies.get('menus');
    if (menus!==undefined){
        for (const menu of menus) {
            if(request.nextUrl.pathname.includes(menu.to)){
                if (userLogged === undefined && menu.tipo==='interno') {
                    return NextResponse.redirect(new URL(auth.signin, request.url));
                }
            }
        }
    }
    return NextResponse.next();
}