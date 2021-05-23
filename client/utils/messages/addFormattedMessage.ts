import { IMessage } from "../../store/ducks/chates/types";
import { IWithTimeStamps } from "../../types";
import { getIntDate } from "../date/getIntDate";
import { IFormatMsgObject } from "./getFormattedMessages";

const timeDiffMsg = 3 * 60 * 1000;
type Options = {
  addPhotos?: (photo: string[]) => void;
  photosLength: number
};
export const addFormattedMessage = (
  acc: IFormatMsgObject,
  message: IWithTimeStamps<IMessage>,
  { addPhotos, photosLength }: Options
) => {
  const dayMessage = new Date(message.createdAt).toDateString();
  const intDate = getIntDate(message.createdAt);
  // photos передан, если выполняется форматирование всех сообщения (когда только загрузили страницу  с сообщения)
  // чтобы не делать много диспатчей, то фото сохраняю в массива photos и потом 1 диспатч
  const images = message.image || []
  if (addPhotos) {
    addPhotos(images)
  }
  const msgPhotos = images.map((img, i) => ({url: img, idx: i + photosLength }))
  if (!acc[dayMessage]) {
    acc[dayMessage] = [];
  } else {
    // иначе хотя бы 1 сообщение есть и можно обратиться к последнему
    const lastMessage = acc[dayMessage][acc[dayMessage].length - 1];
    if (
      intDate - lastMessage.createdAt < timeDiffMsg &&
      lastMessage.sender._id === message.sender._id
    ) {
      // отправителя можно не показывать так как предыдущее сообщение было недавно,и у того недавнего сообщения есть ава и тд
      acc[dayMessage].push({ ...message, createdAt: intDate, isShow: false, image: msgPhotos });
      return acc;
    }
  }
  acc[dayMessage].push({
    ...message,
    createdAt: intDate,
    image: msgPhotos,
    isShow: true,
  });
  return acc;
};
