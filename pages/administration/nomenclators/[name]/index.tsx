import {findAll} from "../../../api/nomenclators/services/nomenclator.service";
import {useEffect, useState} from "react";
import {GridSelectionModel, GridToolbarContainer, useGridApiContext} from "@mui/x-data-grid";
import {IconButton, Stack} from "@mui/material";
import {AdminLayout, ConfirmationDialog, DataTable, SearchInput} from "../../../../components";
import Link from "next/link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import {formatearNombre} from "../../../../utilities";
import axios from "axios";
import {nomenclators} from "../../../api/nomenclators/routers/nomenclator.router";
import {useSnackbar} from "notistack";


export default function Index({data, nomeclador, name}: any) {
    const { enqueueSnackbar } = useSnackbar()
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [disabled, setDisabled] = useState(false);
    const onSelectionModelChange = (newSelectionModel: GridSelectionModel) => {
        setSelectionModel(newSelectionModel)
    }
    const nuevo = nomenclators.new.replace('[name]', name);
    const edit = nomenclators.edit.replace('[name]', name);
    const DataTableToolBar = () => {
        const apiRef = useGridApiContext();
        const borrarFilas = async () => {
            let ids: number[]=[];
            let actuales = apiRef.current.getSortedRows();
            for (const fila of selectionModel) {
                const obj: any = apiRef.current.getSelectedRows().get(fila);
                ids.push(obj.id);
                actuales=actuales.filter(item=>item.id!==obj.id)
            }
            const res=await axios.delete(nomenclators.delete, {data:{name: name,ids: ids}});
            apiRef.current.setRows(actuales);
            enqueueSnackbar(res.data.message, { variant: res.data.type,  preventDuplicate: true });
        }

        const buscar = (value: string) => {
            console.log(value);
        }

        useEffect(() => {
            if (selectionModel.length > 0) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        });

        return (
            <GridToolbarContainer>
                <Stack direction="row">
                    <ConfirmationDialog handleOk={borrarFilas} id={"confirmation"} title={"Alerta"}
                                        content={"Esta seguro que quiere realizar esta acción"} disabled={disabled}/>

                    <Link href={nuevo}>
                        <IconButton color="success" aria-label="add">
                            <AddCircleIcon/>
                        </IconButton>
                    </Link>
                    <SearchInput id={'buscar'} placeholder={'Buscar'} buscar={buscar}/>
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
                <Link href={`${edit.replace('[id]', params.row.id)}`}>
                    <IconButton key={"edit" + params.row.id} color="warning" aria-label="edit">
                        <EditIcon/>
                    </IconButton>
                </Link>
            </>
        )
    };
    return (
        <AdminLayout title={`Listado del nomenclador ${nomeclador}`}>
            <DataTable title={`Listado del nomenclador ${nomeclador}`} data={data} actions={actions}
                       toolBar={DataTableToolBar}
                       onSelectionModelChange={onSelectionModelChange} selectionModel={selectionModel}
                       setSelectionModel={setSelectionModel}/>
        </AdminLayout>
    )
}

export async function getServerSideProps(context: any) {
    const {params, req, res} = context;
    const respuesta = await findAll(req, res, params.name);
    return {
        props: {
            data: respuesta,
            nomeclador: formatearNombre(params.name, ' '),
            name: params.name,
        },
    };
}
