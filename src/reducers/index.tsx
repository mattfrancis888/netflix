import { combineReducers } from "redux";
import { reducer as formReducer, FormStateMap } from "redux-form";

import authReducer, { AuthStateResponse } from "./authReducer";
import mediasReducer, { MediaStateResponse } from "./mediasReducer";
import errorReducer, { ErrorStateResponse } from "./errorReducer";
// import categoryReducer from "./categoryReducer";
// import listingReducer, { ListingDataResponse } from "./listingReducer";
// import profileReducer, { UserProfileDataResponse } from "./profileReducer";

export interface StoreState {
    authStatus: AuthStateResponse;
    medias: MediaStateResponse;
    errors: ErrorStateResponse;
    // profileInfo: UserProfileDataResponse;
    form: FormStateMap;
}
export default combineReducers<StoreState>({
    authStatus: authReducer,
    medias: mediasReducer,
    errors: errorReducer,
    // profileInfo: profileReducer,
    form: formReducer,
});
