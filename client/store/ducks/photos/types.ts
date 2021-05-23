import { IPhoto } from "../../../components/Chat/MessageForm";



export type IPhotosInfo = {
  photos: IPhoto[];
  selectedPhotoIdx: number | null;
}
export type IPhotosInfoServer = {
  photos: string[];
  selectedPhotoIdx: number | null;
}

export type IPhotosState = {
  add: IPhotosInfo,
  message: IPhotosInfoServer
}
export type IKeyPhotoState = keyof IPhotosState
export type IPhotosKey = {key: IKeyPhotoState}