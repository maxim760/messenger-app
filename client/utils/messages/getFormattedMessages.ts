import { IMessage } from "../../store/ducks/chates/types";
import { IUser } from "../../store/ducks/user/types";
import { IWithTimeStamps } from "../../types";
import { getIntDate } from "../date/getIntDate";
import { addFormattedMessage } from "./addFormattedMessage";

// получаю массив сообщений с учетом:
// 1)  если больше 1 сообщения от 1 пользователя, то аватарку и имя подсвечивать только у первого сообщения
//  если время между сообщениями меньше 3 минут например
// 2) сообщения группировать по дню написания:
/*
        вчера
        ...
        ....
        ...
        ...
        Сегодня
        ...
        ..
    */
// формат такой думаю:
/*

  {
    дата: [массив сообщений] // некоторые сообщения без авы и имени
  }

  */

// isShow определяет показывать ли аватарку и имя у автора сообщения

export type IFormatMsg = Omit<IWithTimeStamps<IMessage>, "createdAt" | "image"> & {
  createdAt: number;
  isShow: boolean;
  image: {url: string, idx: number}[]
};
export type IFormatMsgObject = {
  [key: string]: IFormatMsg[];
};

export type IFormatMsgWithCount = {
  messages: IFormatMsgObject;
  count: number;
};

export const getFormattedMessages = (messages: IWithTimeStamps<IMessage>[]) => {
  const photos = [];
  const addPhotos = (addPhotos: string[]) => photos.push(...addPhotos);
  const formattedMessages: IFormatMsgObject = messages.reduce(
    (acc, value) => addFormattedMessage(acc, value, { addPhotos, photosLength: photos.length }),
    {}
  );
  return { messages: formattedMessages, count: messages.length, photos, photosLength: photos.length };
};
