import {AdminLayout, Listado} from "../../../components";
import {tipoMenu} from "../../api/menus/services/menu.service";
import {ReadMenu} from "../../api/menus/models/read-menu.model";

export default function Index({data}: any) {
    return (
        <AdminLayout title={'Listado de usuarios'}>
            <Listado title={'Listado de los usuarios'}/>
        </AdminLayout>
    )
}
export async function getStaticProps() {
    try {

        return {
            props: {
                data: []
            },
        };
    }catch (e){
        console.log(e);
    }
}