import {useReducer, createContext, useEffect} from 'react';

const inicialState = {
    user: {
        username: '',
        isAutenticated: false
    },
}
const Context: any = createContext(null);

const rootReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload};
        default:
            return state;
    }
};

const Provider = ({children}: any) => {
    const [state, dispatch] = useReducer(rootReducer, inicialState)
    useEffect(() => {
        let user = window.localStorage.getItem('user');
        user=JSON.parse(String(user));
        dispatch({
            type: 'LOGIN',
            payload: user,
        });

    }, []);
    return (
        <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
    );
}

export {Context, Provider};