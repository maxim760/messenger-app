import clsx from "clsx";
import React, { useState } from "react";
import { A } from "../../components/A";
import { SearchBlock } from "../../components/SearchBlock";
import { ChatTemplate } from "../../components/Templates/Chat";
import { useChange } from "../../hooks/useChange";
import { ROUTES } from "../../utils/routes";
import styles from "./friend.module.scss";
import { MdClose as CloseIcon } from "react-icons/md";
import { FiMoreHorizontal as MoreIcon } from "react-icons/fi";
enum FriendsMode {
  ALL = "ALL",
  ONLINE = "ONLINE",
}

const defaultFriends = [
  {
    name: "Адель Хххххх",
    avatar:
      "https://sun9-58.userapi.com/s/v1/if2/Q9J47qfM4AZqrPPTis8eSNsZoftI8V7oxVID038yZQ66F4j1I2fRQ5EjrxKqadZQXs4S1uQKDgRyBnVTt8-OPvmy.jpg?size=100x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1",
    isOnline: true,
  },
  {
    name: "Ахмат Латыев",
    avatar:
      "https://sun9-75.userapi.com/s/v1/if1/nlulm4UqKLnN52fhU3tWqcqrImg6D1hLHlprQajmfCwSBQrnbnCoFIEEGrP04-4gIdCeL60K.jpg?size=100x0&quality=96&crop=0,291,750,750&ava=1",
    isOnline: false,
  },
  {
    name: "Shamil Shundalov",
    avatar:
      "https://sun9-46.userapi.com/s/v1/ig2/kWW8yDXGqSaArZXrGL7Ga-IrOk9jC9ryLk6DCkgcAc0Bv2-f_4asa74C2HW09hn3B4rW54t-cYnn2GdA9zWaTv8G.jpg?size=100x0&quality=96&crop=3,187,1615,1615&ava=1",
    isOnline: false,
  },
  {
    name: "Юрий Фоменков",
    avatar:
      "https://sun9-11.userapi.com/s/v1/ig2/GALeO9FcppBT6xq9w67OxPSfFRyugmDliM8VA9lZK5cHyojkwGcfxv01w6M8dWoxOm9apsY5QwyYQqXsZCX8e92P.jpg?size=100x0&quality=96&crop=34,268,1032,1032&ava=1",
    isOnline: true,
  },
  {
    name: "Джамиль Закриев",
    avatar: "/static/avatar-stub.png",
    isOnline: true,
  },
];

const FriendsPage: React.FC = (): React.ReactElement => {
  const { input: search, reset } = useChange();
  const [friendsMode, setFriendsMode] = useState<FriendsMode>(FriendsMode.ALL);
  const isAllFriends = friendsMode === FriendsMode.ALL;
  const [friends, setFriends] = useState(defaultFriends);
  const onClickMode = (mode: FriendsMode) => () => {
    setFriendsMode(mode);
    if (mode === FriendsMode.ALL) {
      setFriends(defaultFriends);
      return;
    }
    setFriends(defaultFriends.filter((friend) => friend.isOnline));
  };
  return (
    <ChatTemplate title="Друзья" className={styles.wrap}>
      <div className={styles.header}>
        <button
          onClick={onClickMode(FriendsMode.ALL)}
          className={clsx(styles.tab, { [styles.tabActive]: isAllFriends })}
        >
          Все Друзья<span className={styles.tabCount}>{5}</span>
        </button>
        <button
          onClick={onClickMode(FriendsMode.ONLINE)}
          className={clsx(styles.tab, { [styles.tabActive]: !isAllFriends })}
        >
          Друзья онлайн<span className={styles.tabCount}>3</span>
        </button>
      </div>
      <SearchBlock>
        <input
          placeholder="Поиск друзей"
          type="text"
          className={clsx("fullwidth", "search", "ml-2", "mr-2")}
          {...search}
        />
        {!!search.value && <CloseIcon onClick={reset} className="icon" />}
      </SearchBlock>
      <div className={styles.results}>
        {friends.map(({ isOnline, name, avatar }) => (
          <div className={styles.user}>
            <img
              src={avatar}
              alt={name}
              className={clsx(styles.img, { [styles.imgOnline]: isOnline })}
            />
            <div className={styles.userInfo}>
              <A href={ROUTES.PROFILE + "/1"} className={styles.name}>
                {name}
              </A>
              <A href={ROUTES.PROFILE + "/1"} className={styles.message}>
                Написать сообщение
              </A>
            </div>
            <div className={styles.wrap}>
              <MoreIcon className={clsx("icon", styles.more)} />
              <ul className={styles.info}>
                <li className={styles.infoItem}>Посмотреть друзей</li>
                <li className={styles.infoItem}>Удалить из друзей</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </ChatTemplate>
  );
};

export default FriendsPage;
