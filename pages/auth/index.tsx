import {useState} from "react";
import FormLogin from "../../components/FormLogin";
import {Layout} from "../../components";
import axios from "axios";
import {auth} from "../api/auth/routers/auth.router";
import {db} from "../../localdb/db";
import {AccionesMenu} from "../../localdb/menu";
import {useRouter} from "next/router";

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('')
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
             const menu: AccionesMenu = new AccionesMenu(db);
             await menu.addAll(response.data.menu);
            await router.push('/');
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
export default Login