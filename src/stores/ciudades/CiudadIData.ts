export interface ICiudades {
    ciudades: Array<ICiudad>
}

export interface ICiudad {
    id: number,
    nombre: string,
    provincia: string,
    provinciaId: number
}

export interface ICiudadesAction {
    type: string,
    payload: any,
}