import { combineReducers } from "redux";
import { reducer as formReducer, FormStateMap } from "redux-form";

import authReducer, { AuthStateResponse } from "./authReducer";
import mediasReducer, { MediaStateResponse } from "./mediasReducer";
import errorReducer, { ErrorStateResponse } from "./errorReducer";
import mediaGenreAndCastReducer, {
    MediaGenreAndCastStateResponse,
} from "./mediaGenreAndCastReducer";

export interface StoreState {
    authStatus: AuthStateResponse;
    medias: MediaStateResponse;
    mediaGenreAndCast: MediaGenreAndCastStateResponse;
    errors: ErrorStateResponse;
    form: FormStateMap;
}
export default combineReducers<StoreState>({
    authStatus: authReducer,
    medias: mediasReducer,
    errors: errorReducer,
    mediaGenreAndCast: mediaGenreAndCastReducer,

    form: formReducer,
});
