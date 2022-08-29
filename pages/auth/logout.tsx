import {Layout} from "../../components";
import axios from "axios";
import {auth} from "../api/auth/routers/auth.router";
import {useRouter} from "next/router";

const Logout = () => {
    //const router = useRouter();
try {
    //window.localStorage.removeItem('user');
     axios.post(auth.logout);
    // router.push('/');
}catch (error:any){
    console.log(error)
}

    return (
        <Layout>
        </Layout>
    )
}
export default Logout