const FormLogin = ({errorMessage, onSubmit}: any) => (
    <form onSubmit={onSubmit}>
        <label>
            <span>Usuario</span>
            <input type="text" name="username" required defaultValue={'admin'}/>
        </label>
        <label>
            <span>Contraseña</span>
            <input type="password" name="password" required defaultValue={'Qwerty1234*'}/>
        </label>

        <div className="submit">
            <button type="submit">Entrar</button>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <style jsx>{`
          form,
          label {
            display: flex;
            flex-flow: column;
          }

          label > span {
            font-weight: 600;
          }

          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .submit {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            justify-content: space-between;
          }

          .submit > a {
            text-decoration: none;
          }

          .submit > button {
            padding: 0.5rem 1rem;
            cursor: pointer;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .submit > button:hover {
            border-color: #888;
          }

          .error {
            color: brown;
            margin: 1rem 0 0;
          }
        `}</style>
    </form>
)

export default FormLogin
