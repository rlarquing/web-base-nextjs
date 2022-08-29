import Link from "next/link";
import style from "../styles/Menu.module.css";
import {dashboard} from '../pages/dashboard/routers/dashboard.router';
import {auth} from '../pages/auth/routers/auth.router';
import * as authApi from '../pages/api/auth/routers/auth.router';
import {useContext} from "react";
import {Context} from "../contexts";
import {useRouter} from "next/router";
import axios from "axios";
import {AccionesMenu} from "../localdb/menu";
import {db} from "../localdb/db";

export const Menu = ({userLogged}: any) => {
    const {state, dispatch} = useContext(Context);
    const router = useRouter();
    async function handleLogout(e: any) {
        e.preventDefault()
        try {
            await axios.post(authApi.auth.logout);
            window.localStorage.removeItem('user');
            dispatch({
                type: 'LOGOUT'
            })

            await router.push('/');
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    }
    return (
        <nav className={style.menu}>
            <div>
                <Link href={dashboard.index}>
                    <a className={style.link}>Dashboard</a>
                </Link>

                <Link href="/administration">
                    <a className={style.link}>Administración</a>
                </Link>
                {userLogged ?
                        <a className={style.link} onClick={handleLogout}>Salir</a>
                    :
                    <Link href={auth.signin}>
                        <a className={style.link}>Login</a>
                    </Link>
                }
            </div>

            <div></div>
        </nav>
    );
}
