import Head from "next/head";
import {Menu} from "./Menu";
import style from "../styles/Layout.module.css";

export const Layout=({children, title}: any) => {
    return (
        <div>
            <Head>
                <title>App {title ? ` | ${title}` : ""}</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Menu/>

            <div className={style.container}>{children}</div>
        </div>
    );
}
