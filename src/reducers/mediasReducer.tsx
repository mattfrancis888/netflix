import {
    ActionTypes,
    FetchMediasAction,
    FetchMediaResponse,
    FetchMediasByKeywordAction,
} from "../actions";
// import {
//     Media,
// } from "../actions";

export interface MediaStateResponse {
    data?: FetchMediaResponse;
}

const mediaReducer = (
    state: MediaStateResponse = {},
    action: FetchMediasAction | FetchMediasByKeywordAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_MEDIAS:
            return { ...state, data: action.payload };
        case ActionTypes.FETCH_MEDIAS_BY_KEYWORD:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default mediaReducer;
