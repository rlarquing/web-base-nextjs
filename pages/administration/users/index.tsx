import {AdminLayout} from "../../../components";
import DataTable from "../../../components/DataTable";
import {findAll} from "../../api/users/services/user.service";
import Link from "next/link";
import {Button} from "@mui/material";

export default function Index({data}: any) {
    const actions: any = {
        field: 'actions',
        headerName: 'Acciones',
        flex: 1,
        renderCell: (params: any) => (
            <>
                <Link href={"/"+params.row.id}>
                    <Button key={"e"+params.row.id}>Editar</Button>
                </Link>
                <Link href={"/"+params.row.id}>
                <Button key={"m"+params.row.id}>Mostrar</Button>
                </Link>
            </>
        )
    };
    return (
        <AdminLayout title={'Listado de usuarios'}>
            <DataTable title={'Listado de los usuarios'} data={data} actions={actions}/>
        </AdminLayout>
    )
}

export async function getServerSideProps(context: any) {
    const respuesta = await findAll(context.req, context.res);
    return {
        props: {
            data: respuesta
        },
    };
}
