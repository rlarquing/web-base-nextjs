import Head from "next/head";
import style from "../styles/AdminLayout.module.css";
import React, {useContext, useEffect} from "react";
import {Context} from "../contexts";
import {AdminMenu} from "./AdminMenu";
import Link from "next/link";
import {dashboard} from "../pages/dashboard/routers/dashboard.router";
import {auth} from "../pages/auth/routers/auth.router";

export const AdminLayout = ({children, title}: any) => {
    const {state, dispatch} = useContext(Context);
    let userLogged: boolean = false;
        if (state.user){
            userLogged=state.user.isAutenticated;
        }
    return (
        <div>
            <Head>
                <title>App {title ? ` | ${title}` : ""}</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <nav className={style.nav}>
                <div>
                    prueba
                </div>

                <div></div>
            </nav>
            <AdminMenu userLogged={userLogged}/>

            <div className={style.container}>{children}</div>
        </div>
    );
}