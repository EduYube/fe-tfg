export interface IPubs{
    pubs: Array<IPub>
}

export interface IPub {
    id: number,
    img: string,
    provinciaId: number,
    ciudadId: number,
    favorito: number,
    comentarioId: number,
    text: string
}

export interface IPubActions {
    type: string,
    payload: any
}