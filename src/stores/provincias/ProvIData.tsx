export interface IProvincias {
    provincias: Array<IProvincia>
}
export interface IProvincia {
    id: number,
    name: string,
}

export interface IProvinciaAction {
    type: string,
    payload: Array<IProvincia>
}
