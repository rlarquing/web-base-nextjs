import {AdminLayout, Listado} from "../../../components";
import axios from "axios";
import {users} from "../../api/users/routers/user.router";
import {useEffect, useState} from "react";

export default function Index() {
    const [data,setData] = useState([]);
    useEffect(() => {
       axios.get(users.index).then(res => (setData(res.data)));
    }, [])
    return (
        <AdminLayout title={'Listado de usuarios'}>
            <Listado title={'Listado de los usuarios'} data={data}/>
        </AdminLayout>
    )
}