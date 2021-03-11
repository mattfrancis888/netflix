import {
    ActionTypes,
    FetchMediaGenreCastResponse,
    FetchMediaGenreAndCastAction,
} from "../actions";

export interface MediaGenreAndCastStateResponse {
    data?: FetchMediaGenreCastResponse;
}

const mediaGenreAndCastReducer = (
    state: MediaGenreAndCastStateResponse = {},
    action: FetchMediaGenreAndCastAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_MEDIA_GENRE_AND_CAST:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default mediaGenreAndCastReducer;
