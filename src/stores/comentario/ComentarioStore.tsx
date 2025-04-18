import React, {useReducer} from "react";
import { IComentarioAction, IComentarios } from "./ComentarioIData";

const initialState: IComentarios = {
    comentarios: []
}

export const ComentarioStore = React.createContext<IComentarios | any>(initialState);

function comentarioReducer(comentarioState: IComentarios, comentarioAction: IComentarioAction): IComentarios {
    
    console.log(comentarioState.comentarios)
    switch(comentarioAction.type){
        case 'GET': {
            return{ ...comentarioState, comentarios: comentarioAction.payload}
        }
        case 'POST': {
            return{ ...comentarioState, comentarios: comentarioAction.payload}
        }
        case 'PUT': {
            return{ ...comentarioState, comentarios: comentarioAction.payload}
        }
        default: return comentarioState
    }
}
export function ComentarioStoreProvider(props: any) {
    const [comentarioState, dispatch] = useReducer(comentarioReducer,initialState)
    return (<ComentarioStore.Provider value={{comentarioState, dispatch}}>{props.children}</ComentarioStore.Provider>)
}