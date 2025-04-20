import React, {useContext, useReducer} from "react"
import { ILogin, ILoginAction } from "./LoginIData"

const initialState: ILogin = {
    nick: '',
    password: '',
    admin: false,
    loged: false
}

export const UserStore = React.createContext<ILogin | any>(initialState)

function userReducer(state: ILogin, action: ILoginAction): ILogin {
    switch(action.type){
        case 'LOGIN': {
            return { nick: action.payload.nick, password: action.payload.password, admin: action.payload.admin, loged: true}
        }
        case 'OUT': {
            return {nick: '', password: '', admin: false, loged: false}
        }
        case 'REG': {
            return { nick: action.payload.nick, password: '', admin: action.payload.admin ,loged: true}
        }
        default: return {...state}
    }
}

export function useLogin() {
    return useContext(UserStore)
}

export function UserStoreProvider(props: any) {
    const [state, dispatch] = useReducer(userReducer, initialState)
    return (<UserStore.Provider value={{state,dispatch}}>{props.children}</UserStore.Provider>)
}