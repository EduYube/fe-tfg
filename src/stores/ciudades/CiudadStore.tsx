import React, {useReducer} from "react"
import { ICiudades, ICiudadesAction } from "./CiudadIData";

const initialState: ICiudades = {
    ciudades: []
}
export const CiudadesStore = React.createContext<ICiudades | any>(initialState)

function ciudadesReducer(ciudadesState: ICiudades, action: ICiudadesAction): ICiudades {
    switch(action.type){
        case 'GET': {
            return {...ciudadesState, ciudades: action.payload}
        }
        default: {
            return {...ciudadesState}
        }
    }
}

export function CiudadesStoreProvider(props: any) {
    const [ciudadesState, dispatch] = useReducer(ciudadesReducer, initialState)
    return (<CiudadesStore.Provider value={{ ciudadesState, dispatch}}>{props.children}</CiudadesStore.Provider>)
}