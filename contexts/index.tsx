import {useReducer, createContext, useEffect, useContext, useState} from 'react';

const inicialState = {
        username: '',
        isAutenticated: false
};
const UserContext: any = createContext(inicialState);

const UserProvider = ({children}: any) => {
    const [user, setUser] = useState(inicialState)
    useEffect(() => {
        let user: any = window.localStorage.getItem('user');
        user=JSON.parse(String(user));
       setUser(user);
    }, []);
    return (
        <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
    );
}
const useUserContext=() => {
    return useContext(UserContext);
}
export {useUserContext, UserProvider};
