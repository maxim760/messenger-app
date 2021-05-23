import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPhotosAdd, selectPhotosMsg, selectStartPhotoIdxAdd, selectStartPhotoIdxMsg } from "../../../store/ducks/photos/selectors";
import { addPhotosAdd, clearPhotos, closePhotoModal, setSelectedPhotoIdx, removePhoto as removePhotoFromStore, addPhotosMsg } from "../../../store/ducks/photos/slice";
import { IKeyPhotoState } from "../../../store/ducks/photos/types";
import { IPhoto } from "../MessageForm";


export const usePhotosMessage = () => {
  const key: IKeyPhotoState = "message"
  const dispatch = useDispatch();
  const photos  = useSelector(selectPhotosMsg);
  const startIdx = useSelector(selectStartPhotoIdxMsg);

  const addPhotos = (urls: string[]) => dispatch(addPhotosMsg({ photos: urls }))

  const closeModal = () => {
    dispatch(closePhotoModal({key}))
  }
  const clearPhotosToMsg = () => {
    dispatch(clearPhotos({key}))
  }

  const setStartPhotoIdx = (idx: number) => ()=> {
    dispatch(setSelectedPhotoIdx({idx, key}))
  }

  const returnedData = {
    state: {
      photos, startIdx

    },
    actions: {
      addPhotos,
      closeModal,
      setStartPhotoIdx,
      clearPhotos :clearPhotosToMsg
    }
  }

  return returnedData
};

export const usePhotosAdd = () => {
  const key: IKeyPhotoState= "add"
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotosAdd);
  const startIdx = useSelector(selectStartPhotoIdxAdd);
  const removePhoto = (id: string) => {
    dispatch(removePhotoFromStore({id}));
  };
  const addPhotos = (addedPhotos: IPhoto[]) => dispatch(addPhotosAdd({ photos: addedPhotos }))

  const closeModal = () => {
    dispatch(closePhotoModal({key}))
  }
  const clearPhotosToAdd = () => {
    dispatch(clearPhotos({key}))
  }

  const setStartPhotoIdx = (idx: number) => ()=> {
    dispatch(setSelectedPhotoIdx({idx, key}))
  }

  return {
    state: {
      photos, startIdx
    },
    actions: {
      addPhotos,
      closeModal,
      setStartPhotoIdx,
      clearPhotos: clearPhotosToAdd,
      removePhoto
    }
  }
};
