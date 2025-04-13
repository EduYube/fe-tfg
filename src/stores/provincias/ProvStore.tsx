import React, { useReducer } from "react"
import { IProvincias, IProvinciaAction } from "./ProvIData";
import { useLogin } from "../users/UserStore"; 

const initialState: IProvincias = {
    provincias: []
}
export const ProvStore = React.createContext<IProvincias | any>(initialState);

function provReducer(provState: IProvincias, provAction: IProvinciaAction): IProvincias {
    switch(provAction.type){
        case 'GET': {
            return{ ...provState, provincias: provAction.payload}
        }
        default: return provState
    }
}

export function ProvStoreProvider(props: any) {
    const [provState, dispatch] = useReducer(provReducer,initialState)
    const { state: userState } = useLogin();
    return (<ProvStore.Provider value={{provState, dispatch, admin: userState.admin == 1}}>{props.children}</ProvStore.Provider>)
}