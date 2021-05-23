import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Modal } from "../Modal";
import styles from "../../pages/chat/chat.module.scss";
import { IPhoto } from "../Chat/MessageForm";
import { getServerUrl } from "../../utils/getServerUrl";

interface PhotosSliderModalProps {
  closePhotosModal: () => void;
  startPhotoIdx: number;
  photos: IPhoto[] | string[];
}


type ContractParams = (photo: string | IPhoto, i: number) => {key: string | number, src: string}

export const PhotosSliderModal: React.FC<PhotosSliderModalProps> = ({
  closePhotosModal,
  startPhotoIdx,
  photos,
}): React.ReactElement => {

  const getParams: ContractParams = typeof photos[0] === "string"
    ? (photo: string, i: number) => ({ key: i, src: getServerUrl(photo) })
    : (photo: IPhoto, i: number) => ({ key: photo.id, src: photo.url })

  return (
    <Modal
      onClose={closePhotosModal}
      isVisible={true}
      withoutPadding
      className={styles.modal}
    >
      <Carousel
        className={styles.carousel}
        showThumbs={false}
        autoPlay={false}
        selectedItem={startPhotoIdx}
        swipeable={true}
        infiniteLoop={true}
        showIndicators={false}
        statusFormatter={(current, all) => `${current}/${all}`}
      >
        {(photos as IPhoto[]).map((photo, i) => {
          const {key, src} = getParams(photo, i)
          return (
              <div key={key} className={styles.photoWrap}>
                <img src={src} className={styles.photo} />
              </div>
            )})}
      </Carousel>
    </Modal>
  );
};
