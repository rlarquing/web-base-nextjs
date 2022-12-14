import {useState, useContext} from "react";
import FormLogin from "../../components/FormLogin";
import {Layout} from "../../components";
import axios from "axios";
import {auth} from "../api/auth/routers/auth.router";
import {db} from "../../localdb/db";
import {AccionesMenu} from "../../localdb/menu";
import {useRouter} from "next/router";
import {useUserContext} from "../../contexts";

const Signin = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const {user, setUser}: any = useUserContext();
    const router = useRouter();

    async function handleSubmit(e: any) {
        e.preventDefault()
        if (errorMsg) setErrorMsg('')

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        }
        try {
            const response = await axios.post(auth.signin, body);
            if (response.data.menu.length>0){
                const menu: AccionesMenu = new AccionesMenu(db);
                await menu.addAll(response.data.menu);
                const user: any = {username: body.username, isAutenticated: true};
                setUser(user);
                window.localStorage.setItem('user',JSON.stringify(user));
                await router.push('/');
            }else{
                setErrorMsg('Usuario sin permisos asignados.');
            }
        } catch (error: any) {
            setErrorMsg(error.response.data.message);
        }
    }

    return (
        <Layout title='Login'>
            <div className="login">
                <FormLogin errorMessage={errorMsg} onSubmit={handleSubmit}/>
            </div>
            <style jsx>{`
              .login {
                max-width: 21rem;
                margin: 0 auto;
                padding: 1rem;
                border: 1px solid #ccc;
                border-radius: 4px;
              }
            `}</style>
        </Layout>
    )
}
export default Signin
