export const FunctionAdapter = (obj: any) => ({
    dtoToString: obj.dtoToString,
    id: obj.id,
    nombre: obj.nombre,
    descripcion: obj.descripcion,
    endPoints: obj.endPoints,
    menu: obj.menu === undefined ? null : obj.menu,
});