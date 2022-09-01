import Link from "next/link";
import style from "../styles/Menu.module.css";
import {dashboard} from '../pages/dashboard/routers/dashboard.router';
import {auth} from '../pages/auth/routers/auth.router';
import {auth as authApi} from '../pages/api/auth/routers/auth.router';
import axios from "axios";
import {useRouter} from "next/router";
import {useContext} from "react";
import {Context} from "../contexts";

export const Menu = ({userLogged}: any) => {
    const {state, dispatch} = useContext(Context);
    const router = useRouter();

    async function logout() {
        try {
            const response = await axios.post(authApi.logout);
            window.localStorage.removeItem('user')
            const user: any = {username: '', isAutenticated: false};
            dispatch({
                type: 'LOGIN',
                payload: user
            })
            await router.push('/');
        } catch (error) {
            console.log(error)
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
                    <a className={style.link} href={`#auth/logout`} onClick={logout}>Salir</a>
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
