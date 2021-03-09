import {
    ActionTypes,
    FetchMediaWatchingByUserAction,
    FetchMediaWatchingByUserResponse,
} from "../actions";

export interface WatchingStateResponse {
    data?: FetchMediaWatchingByUserResponse;
}

const watchingReducer = (
    state: WatchingStateResponse = {},
    action: FetchMediaWatchingByUserAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_MEDIA_WATCHING_BY_USER:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default watchingReducer;
