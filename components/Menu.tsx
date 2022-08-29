import Link from "next/link";
import style from "../styles/Menu.module.css";
import {dashboard} from '../pages/dashboard/routers/dashboard.router';
import {auth} from '../pages/auth/routers/auth.router';
import * as authApi from '../pages/api/auth/routers/auth.router';

export const Menu = ({userLogged}: any) => {

    return (
        <nav className={style.menu}>
            <div>
                <Link href={dashboard.index}>
                    <a className={style.link}>Dashboard</a>
                </Link>

                <Link href="/administration">
                    <a className={style.link}>Administración</a>
                </Link>

                <Link href={userLogged ? authApi.auth.logout: auth.signin}>
                    <a className={style.link}>{userLogged ? `Salir` : `Login`}</a>
                </Link>
            </div>

            <div></div>
        </nav>
    );
}
