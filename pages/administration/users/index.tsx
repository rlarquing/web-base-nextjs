import {AdminLayout} from "../../../components";
import DataTable from "../../../components/DataTable";
import {findAll} from "../../api/users/services/user.service";
import Link from "next/link";
import {Button, IconButton, Stack} from "@mui/material";
import {GridSelectionModel, GridToolbarContainer, useGridApiContext} from "@mui/x-data-grid";
import * as React from "react";
import {useState} from "react";
import {ConfirmationDialog} from "../../../components";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';


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
                <Stack direction="row">
                    <ConfirmationDialog handleOk={borrarFilas} id={"confirmation"} title={"Alerta"}
                                        content={"Esta seguro que quiere realizar esta acción"}/>

                    <Link href={"/"}>
                        <IconButton color="success" aria-label="add">
                            <AddCircleIcon />
                        </IconButton>
                    </Link>
                </Stack>
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
                    <IconButton key={"e" + params.row.id} color="warning" aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Link>
                <Link href={"/" + params.row.id} legacyBehavior>
                    <IconButton key={"e" + params.row.id} color="info" aria-label="show">
                        <VisibilityIcon />
                    </IconButton>
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
