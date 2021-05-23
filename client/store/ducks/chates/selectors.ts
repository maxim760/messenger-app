import { statusToObject } from "../../../utils/statusToObject";
import { RootState } from "../../rootReducer";

export const selectChatesState = (state: RootState) => state.chates;
export const selectChates = (state: RootState) => selectChatesState(state).chates;
export const selectStatus = (state: RootState) => {
  const {status} = selectChatesState(state)
  return statusToObject(status)
}


export const selectError = (state: RootState): string | null => {
  const error = selectChatesState(state).error
  if (!error) {
    return null
  }
  return error
}