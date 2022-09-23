import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {Layout} from "../components";
import axios from "axios";
import {menus} from "./api/menus/routers/menu.router";
import {app} from "../utilities/app.utility";
import {AccionesMenu} from "../localdb/menu";
import {db} from "../localdb/db";
import {useEffect} from "react";

const Home: NextPage = ({menus}: any) => {

    useEffect(() => {
        const menu: AccionesMenu = new AccionesMenu(db);
         menu.addAll(menus).finally();
    }, [])
    return (
        <Layout title="Home"></Layout>
    )
}

export default Home

export async function getStaticProps() {
    const response = await axios.get(app() + menus.tipoMenu);
    return {
        props: {
            menus: response.data
        },
    }
}
