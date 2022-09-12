 const ReadMenuAdapter = (obj: any) => ({
    dtoToString: obj.dtoToString,
    id: obj.id,
    label: obj.label,
    icon: obj.icon,
    to: obj.to,
    menuPadre: obj.menuPadre,
    menu: obj.menu,
    menus: obj.menus,
    tipo: obj.tipo
});

export default ReadMenuAdapter;