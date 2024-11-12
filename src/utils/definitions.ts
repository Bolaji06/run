
export type TInputError = {
    message: string,
    path: (string | number)[]
}

export interface loginDataResponse{
    success: boolean;
    message: string;
    token: string;
}

export interface registerDataResponse {
    success: boolean;
    message: string;
}

export interface IWorkspace {
    id: string;
    createdAt: string;
    createdBy: string;
    isPublic: boolean;
    name: string;
    updatedAt: string;
    sheets?: [
        {
            id: string;
            workspaceId: string;
            contents: string;
        }
    ]

}
export interface IUserWorkspace{
    success: boolean,
    userWorkSpace: IWorkspace[]
}

export interface IPlaygroundData {
    success: boolean;
    workspace: IWorkspace;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    avatar: string;
}
export interface IAccountResponse {
    success: boolean;
    user: IUser;
}
export interface ICredentials {
    email: string;
    password: string;
}

export interface ILoginResponse {
    success: boolean;
    message: string;
}