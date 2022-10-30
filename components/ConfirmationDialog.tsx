import {useState} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

interface ConfirmationDialogProps {
    id: string,
    title: string,
    content: string
    handleOk: () => void,
}
export function ConfirmationDialog(props: ConfirmationDialogProps) {
    let {handleOk, title, content, ...other} = props;
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
            <Button onClick={handleClick}>Borrar</Button>
            <Dialog
                sx={{'& .MuiDialog-paper': {width: '100%', maxHeight: 435}}}
                maxWidth="xs"
                open={open}
                {...other}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <h4>{content}</h4>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel}  variant="contained" color="warning">
                        Cancelar
                    </Button>
                    <Button onClick={handleAcept}  variant="contained" color="primary">Aceptar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
