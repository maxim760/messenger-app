import { RootState } from "../../rootReducer";
import { IKeyPhotoState } from "./types";

export const selectPhotosState = (state: RootState) => state.photos
export const selectPhotosAdd =  (state: RootState) => selectPhotosState(state).add.photos
export const selectPhotosMsg =  (state: RootState) => selectPhotosState(state).message.photos
export const selectStartPhotoIdxAdd =  (state: RootState) => selectPhotosState(state).add.selectedPhotoIdx
export const selectStartPhotoIdxMsg =  (state: RootState) => selectPhotosState(state).message.selectedPhotoIdx
