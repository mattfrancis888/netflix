import { ActionTypes, FetchMediasAction, FetchMediaResponse } from "../actions";
// import {
//     Media,
// } from "../actions";

export interface MediaStateResponse {
    data?: FetchMediaResponse;
}

const mediaReducer = (
    state: MediaStateResponse = {},
    action: FetchMediasAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_MEDIAS:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default mediaReducer;
