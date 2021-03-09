import { ActionTypes, ServerError, MediaErrorAction } from "../actions";
// import {
//     Media,
// } from "../actions";

export interface ErrorStateResponse {
    data?: ServerError;
}

const erorrReducer = (
    state: ErrorStateResponse = {},
    action: MediaErrorAction
) => {
    switch (action.type) {
        case ActionTypes.MEDIA_ERROR:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export default erorrReducer;
