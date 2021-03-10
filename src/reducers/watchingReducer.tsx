import {
    ActionTypes,
    FetchMediaWatchingByUserAction,
    WatchingByUserResponse,
    InsertMediaWatchingByUserAction,
} from "../actions";

export interface WatchingStateResponse {
    data?: WatchingByUserResponse;
}

const watchingReducer = (
    state: WatchingStateResponse = {},
    action: FetchMediaWatchingByUserAction | InsertMediaWatchingByUserAction
) => {
    switch (action.type) {
        case ActionTypes.FETCH_MEDIA_WATCHING_BY_USER:
            return { ...state, data: action.payload };
        case ActionTypes.INSERT_MEDIA_WATCHING_BY_USER:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default watchingReducer;
