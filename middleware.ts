import {NextResponse} from 'next/server';
import {auth} from "./pages/auth/routers/auth.router";
import {dashboard} from "./pages/dashboard/routers/dashboard.router";

export function middleware(request: any) {
    //console.log(request.nextUrl.pathname);
    const userLogged = request.cookies.get('userLogged');
   // console.log(request.cookies)
    // if (userLogged === undefined) {
    //     if(request.nextUrl.pathname.includes(auth.signin)){
    //         return NextResponse.next();
    //     }
    //     return NextResponse.redirect(new URL(auth.signin, request.url));
    // }

    if(request.nextUrl.pathname.includes('/administration')){
        if (userLogged === undefined) {
            return NextResponse.redirect(new URL(auth.signin, request.url));
        }
    }
    return NextResponse.next();
}