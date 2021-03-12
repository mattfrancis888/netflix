import {
    ActionTypes,
    FetchMediaResponse,
    FetchMediasByKeywordAction,
} from "../actions";
// import {
//     Media,
// } from "../actions";

export interface SearchStateResponse {
    data?: FetchMediaResponse;
}

const searchReducer = (
    state: SearchStateResponse = {},
    action: FetchMediasByKeywordAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_MEDIAS_BY_KEYWORD:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default searchReducer;
