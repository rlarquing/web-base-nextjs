import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {Layout} from "../components";
import {AccionesMenu} from "../localdb/menu";
import {db} from "../localdb/db";
import {useEffect} from "react";
import {tipoMenu} from "./api/menus/services/menu.service";
import {ReadMenu} from "./api/menus/models/read-menu.model";

const Home: NextPage = ({menus}:any) => {

    useEffect(() => {
        if (menus.length>0){
            const menu: AccionesMenu = new AccionesMenu(db);
            menu.addAll(menus).finally();
        }
    }, [])
    return (
        <Layout title="Home"></Layout>
    )
}

export default Home

export async function getStaticProps() {
    try {
        const reportes = await tipoMenu('reporte');
        const graficos = await tipoMenu('grafico');
        const respuesta: ReadMenu[] = reportes.concat(graficos);
        return {
            props: {
                menus: respuesta as ReadMenu[]
            },
        };
    }catch (e){
        console.log(e);
    }
}
