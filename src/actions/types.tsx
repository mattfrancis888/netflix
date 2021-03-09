import { AuthUserAction, AuthErrorAction } from "../actions";

export enum ActionTypes {
    AUTH_USER,
    AUTH_ERROR,
    FETCH_CATEGORIES_FOR_LISTING,
    FETCH_CATEGORIES_FOR_LISTING_ERROR,
    FETCH_MEDIAS,
    FETCH_MEDIA_GENRE_AND_CAST,
    MEDIA_ERROR,
}
export type AuthActions = AuthUserAction | AuthErrorAction;
