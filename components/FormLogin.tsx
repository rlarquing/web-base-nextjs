import {Button, TextField} from "@mui/material";
import styles from '../styles/FormLogin.module.css'
const FormLogin = ({errorMessage, onSubmit}: any) => (
    <form onSubmit={onSubmit}>
        <label>
            <span>Usuario</span>
            <TextField type="text" name="username" required defaultValue={'admin'} variant="outlined"/>
        </label>
        <label>
            <span>Contraseña</span>
            <TextField type="password" name="password" required defaultValue={'Qwerty1234*'} variant="outlined"/>
        </label>

        <div className={styles.submit}>
            <Button type="submit" variant="contained">Entrar</Button>
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </form>
)

export default FormLogin
