import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPhoto } from "../../../components/Chat/MessageForm";
import { STATUS } from "../../../types";
import { IPhotosKey, IPhotosState } from "./types";

const defaultPhotoInfo = {
  photos: [],
  selectedPhotoIdx: null
}

export const initialState: IPhotosState = {
  add: defaultPhotoInfo,
  message: defaultPhotoInfo
};


const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    addPhotosAdd(state, action: PayloadAction<{ photos: IPhoto[] }>) {
      const {photos} = action.payload
      state.add.photos.push(...photos)
    },
    addPhotosMsg(state, action: PayloadAction<{ photos: string[] }>) {
      const {photos} = action.payload
      state.message.photos.push(...photos)
    },
    removePhoto(state, action: PayloadAction<{id: string}>) {
      const {id} = action.payload
      state.add.photos = state.add.photos.filter(photo => photo.id !== id)
    },
    setSelectedPhotoIdx(state, action: PayloadAction<{idx: number}& IPhotosKey>) {
      const {idx, key}= action.payload
      state[key].selectedPhotoIdx = idx
    },
    closePhotoModal(state, action: PayloadAction<IPhotosKey>) {
      const {key} = action.payload
      state[key].selectedPhotoIdx = null
    },
    clearPhotos(state, action: PayloadAction<IPhotosKey>) {
      const {key} = action.payload
      state[key].photos = []
      state[key].selectedPhotoIdx = null
    }
  },
});

export const {
  addPhotosAdd,addPhotosMsg,removePhoto, setSelectedPhotoIdx, closePhotoModal, clearPhotos
} = photosSlice.actions;
export const photosReducer = photosSlice.reducer;
