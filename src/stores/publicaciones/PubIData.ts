export interface IPubs{
    pubs: Array<IPub>
}

export interface IPub {
    id: number,
    image: string,
    provId: number,
    ciudad: string,
    ciudadId: number,
    favs: number,
    comentario: string,
    text: string
}

export interface IPubActions {
    type: string,
    payload: any
}