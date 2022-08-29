import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {Layout} from "../components";
import {isAutenticated} from "./api/auth/services/auth.service";

const Home: NextPage = ({userLogged}: any) => {
    return (
        <Layout title="Home" userLogged={userLogged}></Layout>
    )
}
export async function getStaticProps(){
const a= await isAutenticated()
    console.log(a)
    return{
        props:{
            userLogged: false
        }
    }
}
export default Home
