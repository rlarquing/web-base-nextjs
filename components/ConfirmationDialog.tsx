import {useState, forwardRef, ReactElement, Ref} from 'react';
import {
    DialogContentText,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Slide, IconButton
} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from "react";
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmationDialogProps {
    id: string,
    title: string,
    content: string,
    handleOk: () => void,
    disabled: boolean
}

export function ConfirmationDialog(props: ConfirmationDialogProps) {
    let {handleOk, title, content, disabled, ...other} = props;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleAcept = () => {
        setOpen(false);
        handleOk();
    };
    return (
        <>
            <IconButton onClick={handleClick} color={"error"} aria-label="delete" disabled={disabled}>
                <DeleteIcon/>
            </IconButton>
            <Dialog
                sx={{'& .MuiDialog-paper': {width: '100%', maxHeight: 435}}}
                maxWidth="xs"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                {...other}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} variant="outlined" color="error">
                        Cancelar
                    </Button>
                    <Button onClick={handleAcept} variant="contained" color="primary">Aceptar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
