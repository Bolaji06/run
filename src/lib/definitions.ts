
export type TInputError = {
    message: string,
    path: (string | number)[]
}

export interface loginDataResponse{
    success: boolean;
    message: string;
    token: string;


}