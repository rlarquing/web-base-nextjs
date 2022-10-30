import {AdminLayout} from "../../../components";
import DataTable from "../../../components/DataTable";
import {findAll} from "../../api/users/services/user.service";
import Link from "next/link";
import {Button} from "@mui/material";
import {GridSelectionModel, GridToolbarContainer, useGridApiContext} from "@mui/x-data-grid";
import * as React from "react";
import {useState} from "react";
import {ConfirmationDialog} from "../../../components";

export default function Index({data}: any) {
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const onSelectionModelChange = (newSelectionModel: GridSelectionModel) => {
        setSelectionModel(newSelectionModel)
    }
    const DataTableToolBar = () => {
        const apiRef = useGridApiContext();
        const borrarFilas = () => {
            for (const fila of selectionModel) {
                console.log(apiRef.current.getSelectedRows().get(fila));
            }
        }

        return (
            <GridToolbarContainer>
                <ConfirmationDialog handleOk={borrarFilas} id={"confirmation"} title={"Alerta"}
                                    content={"Esta seguro que quiere realizar esta acción"}/>

                <Link href={"/"}>
                    Nuevo
                </Link>
            </GridToolbarContainer>
        );
    };
    const actions: any = {
        field: 'actions',
        headerName: 'Acciones',
        flex: 1,
        renderCell: (params: any) => (
            <>
                <Link href={"/" + params.row.id} legacyBehavior>
                    <Button key={"e" + params.row.id}>Editar</Button>
                </Link>
                <Link href={"/" + params.row.id} legacyBehavior>
                    <Button key={"m" + params.row.id}>Mostrar</Button>
                </Link>
            </>
        )
    };
    return (
        <AdminLayout title={'Listado de usuarios'}>
            <DataTable title={'Listado de los usuarios'} data={data} actions={actions} toolBar={DataTableToolBar}
                       onSelectionModelChange={onSelectionModelChange} selectionModel={selectionModel}
                       setSelectionModel={setSelectionModel}/>
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
