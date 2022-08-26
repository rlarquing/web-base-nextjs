import {useCookies} from "react-cookie"
import {signIn} from './services/auth.service';
import {useState} from "react";
import FormLogin from "../../components/FormLogin";
import {Layout} from "../../components";
import {api} from "../../utilities";

const Login = ({data}: any) => {
    const [errorMsg, setErrorMsg] = useState('')
    const [cookie, setCookie] = useCookies(["userLogged"])

    async function handleSubmit(e: any) {
        e.preventDefault()

        if (errorMsg) setErrorMsg('')

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        }
        try {
            const response = await signIn(body, data);
            console.log(response);
            setCookie("userLogged", JSON.stringify(response), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
        } catch (error: any) {
            console.error('An unexpected error happened occurred:', error)
            setErrorMsg(error.message)
        }
    }

    return (
        <Layout>
            <div className="login">
                <FormLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
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
export const getServerSideProps = async () => {
    const data: any = await api();
    return {
        props: {
            data,
        },
    }
}
export default Login