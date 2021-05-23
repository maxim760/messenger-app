import { initialState as chates } from "./ducks/chates/slice";
import { initialState as notify } from "./ducks/notify/slice";
import { initialState as user } from "./ducks/user/slice";
import { initialState as socket } from "./ducks/socket/slice";
import { initialState as typingUsers } from "./ducks/typingUsers/slice";
import { initialState as photos } from "./ducks/photos/slice";
import { initialState as audio } from "./ducks/audio/slice";
import { RootState } from "./rootReducer";

type RootInitialState = {
  [key in keyof RootState]: any
}
// здесь важно, чтобы количетсво ключей было верным и сами ключи
export const rootInitialState: RootInitialState = {
  chates,
  notify,
  user,
  socket,
  typingUsers,
  photos,
  audio
}

