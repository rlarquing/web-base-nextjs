import {findAll} from "../../api/users/services/user.service";

export default function Name() {
    return (
        <>
            <h1>Hello World!</h1>
        </>
    )
}

export async function getServerSideProps(context: any) {
   const {params, req, res}=context;
    console.log(params)
    const respuesta = await findAll(context.req, context.res);
    return {
        props: {
            data: respuesta
        },
    };
}
