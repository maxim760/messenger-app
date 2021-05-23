import { useDispatch, useSelector } from "react-redux";
import { apiUser } from "../services/api/apiUser";
import { selectUserIsAuth } from "../store/ducks/user/selectors";
import { setIsAuth, setNotIsAuth } from "../store/ducks/user/slice";
// import { useDispatch } from "../store/store";

export const useAuth = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectUserIsAuth);
  const onSetAuthTrue = () => dispatch(setIsAuth())
  const onLogout = () => apiUser.out()
  return {
    isAuth,
    onLogout,
    onSetAuthTrue,
  }
}