export interface IUser {
    nick: string,
    pass: string,
    admin: boolean,
    loged: boolean
}

export interface IUserAction {
    type: string,
    payload: IUser,
}