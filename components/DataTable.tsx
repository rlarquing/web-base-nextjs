import * as React from 'react';
import {
    DataGrid,
    GridColDef,
    esES,
} from '@mui/x-data-grid';
import {Paper, Box, Toolbar, Typography, createTheme, ThemeProvider} from "@mui/material";
import {useState} from "react";

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
    actions?: any,
    toolBar?: any,
    checkboxSelection?: boolean,
    onSelectionModelChange?:any,
    selectionModel?: any,
    setSelectionModel?: any,
}

export function DataTable({title, data, actions, checkboxSelection=true, toolBar=null, onSelectionModelChange=null, selectionModel, setSelectionModel}: DataTableProps) {
    const columns: GridColDef[] = [];
   const [tuplas, setTuplas] = useState(data.data.items);
    for (let i = 0; i < data.key.length; i++) {
        if (data.key[i] !== 'id') {
            columns.push(
                {field: data.key[i], headerName: data.header[i], flex: 1}
            );
        }
    }
    if (actions !== undefined) {
        columns.push(actions)
    }

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
                                    rows={tuplas}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10, 15, 20, 50, 100]}
                                    checkboxSelection={checkboxSelection}
                                    onSelectionModelChange={onSelectionModelChange}
                                    components={{
                                        Toolbar: toolBar,
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
