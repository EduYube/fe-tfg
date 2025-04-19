export interface IPubs{
    pubs: Array<IPub>
}

export interface IPub {
    ciudad: string,
    id: number,
    image: string,
    provinciaId: number,
    ciudadId: number,
    favorito: number,
    text: string
}

export interface IPubActions {
    type: string,
    payload: any
}