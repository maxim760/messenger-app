import clsx from "clsx";
import React, { useState } from "react";
import { SearchBlock } from "../../components/SearchBlock";
import { ChatTemplate } from "../../components/Templates/Chat";
import { useChange } from "../../hooks/useChange";
import { MdClose as CloseIcon } from "react-icons/md";

import styles from "./search.module.scss";
import { ROUTES } from "../../utils/routes";
import { A } from "../../components/A";

const SearchPage: React.FC = (): React.ReactElement => {
  const { input: search, reset } = useChange();
  const [isFinded, setIsFinded] = useState(true);
  return (
    <ChatTemplate title="Поиск" className={styles.wrap}>
      <div className={styles.header}>
        Результаты поиска{" "}
        <span className={clsx(styles.count, "ml-2")}>3 346</span>
      </div>
      <SearchBlock>
        <input
          placeholder="Введите запрос"
          type="text"
          className={clsx("fullwidth", "search", "ml-2", "mr-2")}
          {...search}
        />
        {!!search.value && <CloseIcon onClick={reset} className="icon" />}
      </SearchBlock>
      {isFinded ? (
        <div className={styles.results}>
          <div className={styles.user}>
            <img
              src="https://sun9-35.userapi.com/s/v1/if1/WOrvs2S83A6TVc3AUxTvk7SkJSxhdiAC_xVcdyCMKiNZBjhPTaMiRkIKOSFEa_dk2yQsuAeR.jpg?size=100x0&quality=96&crop=0,0,1536,1536&ava=1"
              alt="Пользователь"
              className={styles.img}
            />
            <div className={styles.userInfo}>
              <A href={ROUTES.PROFILE + "/1"} className={styles.name}>
                Александр Кукотин
              </A>
            </div>
            <button className={clsx("contained contained-blue", styles.btn)}>
              Добавить в друзья
            </button>
          </div>
          <div className={styles.user}>
            <img
              src="https://sun9-73.userapi.com/s/v1/ig2/66U9oFIUd851Oe6O7LR5SZzHa9Y0EUrtYOMzzDxt27_bq-ivm-5mXfSc8UXE7tM60rdSFWHtAcycylRx4N7uhOe2.jpg?size=200x0&quality=96&crop=119,48,232,232&ava=1"
              alt="Пользователь"
              className={styles.img}
            />
            <div className={styles.userInfo}>
              <A href={ROUTES.PROFILE + "/1"} className={styles.name}>
                Илья Ермаков
              </A>
              <span className={styles.dopInfo}>Москва, Россия</span>
              <span className={styles.dopInfo}>РТУ МИРЭА</span>
            </div>
            <button className={clsx("contained contained-blue", styles.btn)}>
              Добавить в друзья
            </button>
          </div>
          <div className={styles.user}>
            <img
              src="https://sun9-45.userapi.com/s/v1/ig2/83jvJoaG-QtiaMhH7WYw3UTkDhOp_63rZStvVf5VxubnHBoMoV1Sq4vD9CYIpvPdqrXMPvXYQVUnAf3KnO2SuvBn.jpg?size=100x0&quality=96&crop=1,1,1077,1077&ava=1"
              alt="Пользователь"
              className={styles.img}
            />

            <div className={styles.userInfo}>
              <A href={ROUTES.PROFILE + "/1"} className={styles.name}>
                Никита Заварудов
              </A>
              <span className={styles.dopInfo}>Москва, Россия</span>
            </div>
            <button className={clsx("contained contained-blue", styles.btn)}>
              Добавить в друзья
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.notFound}>
          <p className={styles.notFoundTxt}>Ваш запрос не дал результатов</p>
        </div>
      )}
    </ChatTemplate>
  );
};

export default SearchPage;
