import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
interface ComboBoxProps {
    id: string,
    options: any[],
    width: number
}
export default function ComboBox({id, options, width}: ComboBoxProps) {
    return (
        <Autocomplete
            disablePortal
            id={id}
            options={options}
            sx={{width}}
            renderInput={(params) => <TextField {...params} label="Seleccione" />}
        />
    );
}