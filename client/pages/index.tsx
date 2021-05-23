import clsx from "clsx";
import { IoCreateOutline as CreateIcon } from "react-icons/io5";
import { MdClose as CloseIcon } from "react-icons/md";
import { useChange } from "../hooks/useChange";
import { ChatTemplate } from "../components/Templates/Chat";
import { SearchBlock } from "../components/SearchBlock";
import { ROUTES } from "../utils/routes";
import { GetServerSideProps } from "next";
import { checkAuth } from "../utils/checkAuth";
import { SagaStore, wrapper } from "../store/store";
import { NextReq } from "../types";
import { fetchChates } from "../store/ducks/chates/slice";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import { selectChates } from "../store/ducks/chates/selectors";
import { DialogItem } from "../components/Messenger/DialogItem";
import { useState } from "react";
import { getNameChat } from "../utils/chat/getNameChat";
import styles from "../styles/Home.module.scss"
import { isMatchQuery } from "../utils";

const Home = () => {
  const { input: search, reset } = useChange();
  const chates = useSelector(selectChates);
  const [showChates, setShowChates] = useState(chates);
  const onChangeChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    search.onChange(e);
    const value = e.target.value
    setShowChates(chates.filter((chat) => isMatchQuery({query:value, match: getNameChat(chat)})));
  };
  return (
    <ChatTemplate title="Мессенджер">
      <SearchBlock>
        <input
          placeholder="Поиск.."
          type="text"
          className={clsx("fullwidth", "search", "ml-2", "mr-2")}
          value={search.value}
          onChange={onChangeChat}
        />
        {search.value ? (
          <CloseIcon onClick={reset} className="icon" />
        ) : (
          <CreateIcon className="icon" />
        )}
      </SearchBlock>
      {showChates.length > 0 ? (
        showChates.map((chat) => <DialogItem chat={chat} key={chat._id} />)
      ) : (
        <h2 className={clsx("center mt-5", styles.notChates)}>
          {chates.length == 0
            ? "У вас пока нет чатов"
            : `Чатов по запросу ${search.value} не найдено`}
        </h2>
      )}
    </ChatTemplate>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async ({ store, req }) => {
    try {
      const isAuth = await checkAuth(req as NextReq);
      if (!isAuth) {
        return {
          props: {},
          redirect: {
            destination: ROUTES.LOGIN,
            permanent: false,
          },
        };
      }
      store.dispatch(fetchChates(req as NextReq));
      store.dispatch(END);
      await (store as SagaStore).sagaTask.toPromise();
    } catch (error) {}
  });
