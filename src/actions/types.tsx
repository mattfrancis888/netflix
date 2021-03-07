import { AuthUserAction, AuthErrorAction } from "./auth";
export enum ActionTypes {
    AUTH_USER,
    AUTH_ERROR,
}
export type AuthActions = AuthUserAction | AuthErrorAction;
