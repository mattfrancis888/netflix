import { ActionTypes } from "./types";
import axios from "./axiosConfig";
import { Dispatch } from "redux";

import { SERVER_ERROR_MESSAGE } from "../constants";
import history from "../browserHistory";

export interface ServerError {
    error: string;
}

export interface FetchMediasAction {
    type: ActionTypes.FETCH_MEDIAS;
    payload: FetchMediaResponse;
}

export interface FetchMediaGenreAndCastAction {
    type: ActionTypes.FETCH_MEDIA_GENRE_AND_CAST;
    payload: FetchMediaGenreCastResponse;
}

export interface FetchMediaWatchingByUserAction {
    type: ActionTypes.FETCH_MEDIA_WATCHING_BY_USER;
    payload: FetchMediaWatchingByUserResponse;
}

export interface MediaErrorAction {
    type: ActionTypes.MEDIA_ERROR;
    payload: ServerError;
}

export interface Media {
    media_id: number;
    media_title: string;
    media_date: number;
    media_description: string;
    banner_title_image: string;
    banner_image: string;
    name_tokens: string;
}

export interface Cast {
    actor_first_name: string;
    actor_last_name: string;
}
export interface Genre {
    genre_name: string;
}

export interface WatchingInfo extends Media {
    email: string;
}

export interface FetchMediaResponse {
    medias: Media[];
}

export interface FetchMediaGenreCastResponse {
    casts: Cast[];
    genres: Genre[];
}

export interface FetchMediaWatchingByUserResponse {
    watching: WatchingInfo[];
}
export const fetchMedias = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get<FetchMediaResponse>(`/api/medias`);
        dispatch<FetchMediasAction>({
            type: ActionTypes.FETCH_MEDIAS,
            payload: response.data,
        });
    } catch (error) {
        dispatch<MediaErrorAction>({
            type: ActionTypes.MEDIA_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};

export const fetchMediaGenreAndCast = (mediaId: number) => async (
    dispatch: Dispatch
) => {
    try {
        const response = await axios.get<FetchMediaGenreCastResponse>(
            `/api/genre-cast/${mediaId}`
        );
        dispatch<FetchMediaGenreAndCastAction>({
            type: ActionTypes.FETCH_MEDIA_GENRE_AND_CAST,
            payload: response.data,
        });
    } catch (error) {
        dispatch<MediaErrorAction>({
            type: ActionTypes.MEDIA_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};

export const fetchMediaWatchingByUser = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get<FetchMediaWatchingByUserResponse>(
            `/api/watching`
        );
        dispatch<FetchMediaWatchingByUserAction>({
            type: ActionTypes.FETCH_MEDIA_WATCHING_BY_USER,
            payload: response.data,
        });
    } catch (error) {
        dispatch<MediaErrorAction>({
            type: ActionTypes.MEDIA_ERROR,
            payload: { error: SERVER_ERROR_MESSAGE },
        });
    }
};
