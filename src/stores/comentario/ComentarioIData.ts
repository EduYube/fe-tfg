export interface IComentarios {
    comentarios: Array<IComentario>
}

export interface IComentario {
    id: number,
    texto: string,
    usuario: string,
    publicacionId: number,
}

export interface IComentarioAction {
    type: string,
    payload: any
}