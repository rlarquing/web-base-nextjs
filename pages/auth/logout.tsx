import {useContext} from "react";
import {Layout} from "../../components";
import axios from "axios";
import {auth} from "../api/auth/routers/auth.router";
import {useRouter} from "next/router";
import {Context} from "../../contexts";

const Logout = async () => {
    const {state, dispatch} = useContext(Context);
    const router = useRouter();

    const response = await axios.post(auth.logout);
    dispatch({
        type: 'LOGOUT'
    })
    window.localStorage.removeItem('user');
    await router.push('/');

    return (
        <Layout>
        </Layout>
    )
}
export default Logout