import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {Layout} from "../components";
import axios from "axios";
import {menus} from "./api/menus/routers/menu.router";

const Home: NextPage = ({menus}) => {

    return (
        <Layout title="Home"></Layout>
    )
}

export default Home

export async function getStaticProps() {
       const response = await axios.get(menus.tipoMenu);
    return {
        props: {
            menus: response.data
        },
    }
}
