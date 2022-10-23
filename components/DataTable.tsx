import * as React from 'react';
import {
    DataGrid,
    GridColDef,
    esES,
    GridSelectionModel,
    useGridApiContext, GridToolbarContainer
} from '@mui/x-data-grid';
import {Paper, Box, Toolbar, Typography, createTheme, ThemeProvider} from "@mui/material";
import Link from "next/link";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";

// {
//     field: 'fullName',
//         headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     valueGetter: (params: GridValueGetterParams) =>
//     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
// },
const theme = createTheme(
    {
        palette: {
            primary: {main: '#1976d2'},
        },
    },
    esES,
);

interface DataTableProps {
    title: string,
    data: any,
    actions?: any
}

export default function DataTable({title, data, actions}: DataTableProps) {
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const columns: GridColDef[] = [];
    let rows: any[] = [];
    for (let i = 0; i < data.key.length; i++) {
        if (data.key[i] !== 'id') {
            columns.push(
                {field: data.key[i], headerName: data.header[i], flex: 1}
            );
        }
    }
    if (data.data.items.length > 0) {
        rows = data.data.items;
    }
    if (actions !== undefined) {
        columns.push(actions)
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
                <Button onClick={borrarFilas}>Borrar</Button>
                <Link href={"/"}>
                    <a>Nuevo</a>
                </Link>
            </GridToolbarContainer>
        );
    };

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <Toolbar>
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {title}
                    </Typography>
                </Toolbar>

                <div style={{height: 400, width: '100%'}}>
                    <div style={{display: 'flex', height: '100%'}}>
                        <div style={{flexGrow: 1}}>
                            <ThemeProvider theme={theme}>
                                <DataGrid
                                    disableSelectionOnClick={true}
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10, 15]}
                                    checkboxSelection
                                    onSelectionModelChange={(newSelectionModel) => {
                                        setSelectionModel(newSelectionModel)
                                    }}
                                    components={{
                                        Toolbar: DataTableToolBar,
                                    }}
                                />
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
            </Paper>
        </Box>
    );
}