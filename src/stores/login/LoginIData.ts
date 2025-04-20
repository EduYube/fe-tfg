export interface ILogin {
    nick: string,
    pass: string,
    admin: boolean,
    loged: boolean
}

export interface ILoginAction {
    type: string,
    payload: ILogin,
}