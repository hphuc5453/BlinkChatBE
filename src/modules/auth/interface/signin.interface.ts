export interface SignInInterface {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly token?: string;
    readonly status: string;
}