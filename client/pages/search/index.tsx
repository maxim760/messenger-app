import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { SearchBlock } from "../../components/SearchBlock";
import { ChatTemplate } from "../../components/Templates/Chat";
import { MdClose as CloseIcon } from "react-icons/md";

import styles from "./search.module.scss";
import { apiUser, IUserFromServer } from "../../services/api/apiUser";
import {  FriendsListItem, UserLinkInfo } from "../../components";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/ducks/user/selectors";
import { debounce, getFriendStatusFromUser, getFriendItemComponent } from "../../utils";

const SearchPage: React.FC = (): React.ReactElement => {
  const myUserId = useSelector(selectUserId)
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<IUserFromServer[]>([]);
  const isFinded = users.length > 0;

  const onChangeQuery = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(target.value);
  };
  const onResetQuery = () => {
    setSearchQuery("");
  };

  const debouncedQueryHandler = useCallback(
    debounce(async (value: string) => {
      const findedUsers = await apiUser.getAll({ payload: value });
      setUsers(findedUsers);
    }, 400),
    []
  );
  useEffect(() => {
    debouncedQueryHandler(searchQuery);

  }, [searchQuery])

  return (
    <ChatTemplate title="Поиск" className={styles.wrap}>
      <div className={styles.header}>
        Результаты поиска
        <span className={clsx(styles.count, "ml-2")}>{users.length.toLocaleString()}</span>
      </div>
      <SearchBlock>
        <input
          placeholder="Введите запрос"
          type="text"
          className={clsx("fullwidth", "search", "ml-2", "mr-2")}
          value={searchQuery}
          onChange={onChangeQuery}
        />
        {!!searchQuery && <CloseIcon onClick={onResetQuery} className="icon" />}
      </SearchBlock>
      {isFinded ? (
        <div className={styles.results}>
          
          {users.map((user) => {
            // додлеать компоненты
            const status = getFriendStatusFromUser(user, myUserId)
            const Component = user._id === myUserId ? UserLinkInfo : getFriendItemComponent(status)
            return (
              <FriendsListItem key={user._id} user={user}>
                {/* {checkOfflineUser(user) === false && <span>ЭТОТ ЧЕЛОВЕК ОНЛАЙН</span>} */}
                <Component notifyType={status} user={user} />
              </FriendsListItem>
            )
          })}

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
