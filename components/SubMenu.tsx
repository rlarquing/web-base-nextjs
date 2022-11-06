import {useState} from "react";
import {ListItemButton, ListItemText, Collapse, List, ListItemIcon, Icon, ListItem} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Link from "next/link";
import * as React from "react";

interface SubMenuProps {
    nombre?: string,
    menus: any[]
}

export function SubMenu({nombre, menus}: SubMenuProps) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    if (nombre !== undefined) {
        return (
            <>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary={nombre}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {menus.map((text, index) => (
                            <ListItem key={text.id} disablePadding sx={{display: 'block'}}>
                                <Link href={`${text.to}`} legacyBehavior>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Icon>{text.icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={text.label} sx={{opacity: open ? 1 : 0}}/>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Collapse></>
        );
    } else {
        return (
            <>
                {menus.map((text, index) => (
                    <ListItem key={text.id} disablePadding sx={{display: 'block'}}>
                        <Link href={`${text.to}`} legacyBehavior>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Icon>{text.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={text.label} sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </>
        );
    }

}
