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

export interface FetchMediaResponse {
    medias: Media[];
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
