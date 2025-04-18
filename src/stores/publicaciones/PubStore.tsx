import React, { useReducer } from "react"
import {  IPubActions, IPubs } from "./PubIData"
import { useLogin } from "../users/UserStore"

const initialState: IPubs = {
    pubs: []
}
export const PubStore = React.createContext<IPubs | any>(initialState)

function pubsReducer(pubsState: IPubs, action: IPubActions): IPubs {
    switch(action.type){
        case 'GET': {
            return {...pubsState, pubs: action.payload}
        }
        default: return {...pubsState}
    }
}

export function PubsStoreProvider(props: any) {
    const [pubsState, dispatch] = useReducer(pubsReducer, initialState)
    const {state: userState} = useLogin()
    return (<PubStore.Provider value={{pubsState, dispatch, loged: userState.nick != '', admin: userState.admin, user: userState.nick}}>{props.children}</PubStore.Provider>)
}