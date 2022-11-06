import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
interface SearchInputProps {
    id: string,
    placeholder: string,
    buscar: (value:string) => void,
}
export function SearchInput({id, placeholder, buscar}: SearchInputProps) {
    const [value, setValue] = useState('');
    return (
        <Paper elevation={0}>
            <InputBase
                id={id}
                placeholder={placeholder}
                inputProps={{ 'aria-label': placeholder }}
                onChange={(e)=>setValue(e.target.value)}
            />
            <IconButton type="button" aria-label="search" onClick={()=>buscar(value)}>
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}
