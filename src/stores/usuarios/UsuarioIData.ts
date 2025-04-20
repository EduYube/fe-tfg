export interface IUsuarios {
    usuarios: IUsuario[],
}

export interface IUsuario {
    nick: string,
    password: string,
    admin: number,
}

export interface IUsuarioAction {
    type: string,
    payload: IUsuarios,
}