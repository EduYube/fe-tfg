export interface ILogin {
    nick: string,
    password: string,
    admin: boolean,
    loged: boolean
}

export interface ILoginAction {
    type: string,
    payload: ILogin,
}