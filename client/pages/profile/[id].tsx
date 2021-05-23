import React, { useState } from "react";
import { MainTemplate } from "../../components/Templates/Main";
import { Profile } from "../../components/Profile";
import { GetServerSideProps } from "next";
import { apiUser } from "../../services/api/apiUser";
import { IUserFull } from "../../store/ducks/user/types";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/ducks/user/selectors";
import { getFriendStatusFromUser, getAuthorization } from "../../utils";

type ProfilePageProps = {
  user: IUserFull;
};

export enum FRIENDS_STATUS {
  FRIENDS = "FRIENDS",
  SEND = "SEND",
  INCOMING = "INCOMING",
  NONE = "NONE",
}

export const friendsStatuses = {
  FRIENDS: { value: FRIENDS_STATUS.FRIENDS, next: FRIENDS_STATUS.INCOMING },
  SEND: { value: FRIENDS_STATUS.SEND, next: FRIENDS_STATUS.NONE },
  INCOMING: { value: FRIENDS_STATUS.INCOMING, next: FRIENDS_STATUS.FRIENDS },
  NONE: { value: FRIENDS_STATUS.NONE, next: FRIENDS_STATUS.SEND },
};

type IUserContext = {
  user: IUserFull;
  isOwnPage: boolean;
  friendsStatusName: FRIENDS_STATUS;
  onNextStatus(): void;
  statusToServer: FRIENDS_STATUS;
};

export const UserContext = React.createContext<IUserContext>(
  {} as IUserContext
);

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const currentUserId = useSelector(selectUserId);
  const thisUserId = useSelector(selectUserId);
  const isOwnPage = user._id == thisUserId;
  const [friendsStatus, setFriendStatus] = useState(
    friendsStatuses[getFriendStatusFromUser(user, currentUserId)]
  );
  const onNextStatus = () => {
    setFriendStatus(friendsStatuses[friendsStatus.next]);
  };
  return (
    <MainTemplate title={"Профиль"} className="container" showHeader>
      <div className="mt-6">
        <UserContext.Provider
          value={{
            user,
            isOwnPage,
            friendsStatusName: friendsStatus.value,
            onNextStatus,
            statusToServer: friendsStatuses[friendsStatus.next].value,
          }}
        >
          <Profile />
        </UserContext.Provider>
      </div>
    </MainTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const id = params.id as string;
  try {
    const user = await apiUser.getById({
      payload: id,
      authorization: getAuthorization(req as any),
    });
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default ProfilePage;
