import {
    AuthUserAction,
    AuthErrorAction,
    FetchMediasAction,
    MediaErrorAction,
} from "../actions";

export enum ActionTypes {
    AUTH_USER,
    AUTH_ERROR,
    FETCH_CATEGORIES_FOR_LISTING,
    FETCH_CATEGORIES_FOR_LISTING_ERROR,

    FETCH_MEDIAS,
    MEDIA_ERROR,
}
export type AuthActions = AuthUserAction | AuthErrorAction;

export type MediaAction = FetchMediasAction | MediaErrorAction;
