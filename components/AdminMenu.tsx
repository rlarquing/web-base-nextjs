import Link from "next/link";
import style from "../styles/Menu.module.css";
import {auth} from '../pages/auth/routers/auth.router';
import {auth as authApi} from '../pages/api/auth/routers/auth.router';
import axios from "axios";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {useUserContext} from "../contexts";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import {dashboard} from "../pages/dashboard/routers/dashboard.router";

export const AdminMenu = ({userLogged}: any) => {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const {user, setUser} = useUserContext();
    const router = useRouter();
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    async function logout() {
        try {
            const response = await axios.post(authApi.logout);
            window.localStorage.removeItem('user')
            const user: any = {username: '', isAutenticated: false};
            setUser(user)
            await router.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
            <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Usuarios"/>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Funciones"/>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Funciones"/>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Funciones"/>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Funciones"/>
                    </ListItemButton>
                </List>
            </Box>
    );
}
