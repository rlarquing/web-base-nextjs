import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
interface SearchInputProps {
    id: string,
    placeholder: string,
    buscar: () => void,
}
export function SearchInput({id, placeholder, buscar}: SearchInputProps) {
    return (
        <Paper elevation={0}>
            <InputBase
                id={id}
                placeholder={placeholder}
                inputProps={{ 'aria-label': placeholder }}
            />
            <IconButton type="button" aria-label="search" onClick={buscar}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}
