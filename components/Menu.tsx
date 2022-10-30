import Link from "next/link";
import style from "../styles/Menu.module.css";
import {dashboard} from '../pages/dashboard/routers/dashboard.router';
import {auth} from '../pages/auth/routers/auth.router';
import {auth as authApi} from '../pages/api/auth/routers/auth.router';
import axios from "axios";
import {useRouter} from "next/router";
import {useUserContext} from "../contexts";
import {AccionesMenu} from "../localdb/menu";
import {db} from "../localdb/db";

export const Menu = ({userLogged}: any) => {
    const {user, setUser}: any = useUserContext;
    const router = useRouter();

    async function logout() {
        try {
            const response = await axios.post(authApi.logout);
            window.localStorage.removeItem('user')
            const menu: AccionesMenu = new AccionesMenu(db);
            await menu.deleteAll();
            const user: any = {username: '', isAutenticated: false};
           setUser(user)
            await router.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className={style.menu}>
            <div>
                <Link href={dashboard.index} className={style.link}>
                    Dashboard
                </Link>

                <Link href="/administration" className={style.link}>
                    Administración
                </Link>
                {userLogged ?
                    <a className={style.link} href={`#auth/logout`} onClick={logout}>Salir</a>
                    :
                    <Link href={auth.signin} className={style.link}>
                        Login
                    </Link>
                }
            </div>

            <div></div>
        </nav>
    );
}
