import { AuthUserAction, AuthErrorAction } from "../actions";

export enum ActionTypes {
    AUTH_USER,
    AUTH_ERROR,
    FETCH_CATEGORIES_FOR_LISTING,
    FETCH_CATEGORIES_FOR_LISTING_ERROR,
    FETCH_MEDIAS,
    FETCH_MEDIA_GENRE_AND_CAST,
    FETCH_MEDIA_WATCHING_BY_USER,
    INSERT_MEDIA_WATCHING_BY_USER,
    REMOVE_MEDIA_WATCHING_BY_USER,
    FETCH_MEDIAS_BY_KEYWORD,
    MEDIA_ERROR,
}
export type AuthActions = AuthUserAction | AuthErrorAction;
