import React, {useContext, useReducer} from "react"
import { IUser, IUserAction } from "./UserIData"

const initialState: IUser = {
    nick: '',
    pass: '',
    admin: false,
    loged: false
}

export const UserStore = React.createContext<IUser | any>(initialState)

function userReducer(state: IUser, action: IUserAction): IUser {
    switch(action.type){
        case 'LOGIN': {
            return { nick: action.payload.nick, pass: '', admin: action.payload.admin, loged: true}
        }
        case 'OUT': {
            return {nick: '', pass: '', admin: false, loged: false}
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