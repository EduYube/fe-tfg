import React, {useReducer} from "react"
import { ICiudades, ICiudadesAction } from "./CiudadIData";
import { useLogin } from "../login/LoginStore";

const initialState: ICiudades = {
    ciudades: []
}
export const CiudadesStore = React.createContext<ICiudades | any>(initialState)

function ciudadesReducer(ciudadesState: ICiudades, action: ICiudadesAction): ICiudades {
    switch(action.type){
        case 'GET': {
            return {...ciudadesState, ciudades: action.payload}
        }
        case 'PUT': {
            return {...ciudadesState, ciudades: action.payload}
        }
        case 'POST': {
            return {...ciudadesState, ciudades: action.payload}
        }
        default: {
            return {...ciudadesState}
        }
    }
}

export function CiudadesStoreProvider(props: any) {
    const [ciudadesState, dispatch] = useReducer(ciudadesReducer, initialState)
    const {state: userState} = useLogin()
    return (<CiudadesStore.Provider value={{ ciudadesState, dispatch, admin: userState.admin == 1}}>{props.children}</CiudadesStore.Provider>)
}