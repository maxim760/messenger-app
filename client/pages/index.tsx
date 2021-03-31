import clsx from "clsx";
import { A } from "../components/A";
import { MainTemplate } from "../components/Templates/Main";
import styles from "../styles/Home.module.scss";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { IoCreateOutline as CreateIcon } from "react-icons/io5";
import { MdClose as CloseIcon } from "react-icons/md";
import { useChange } from "../hooks/useChange";
import { BiMessageRounded as MessageIcon } from "react-icons/bi";
import { FaUserFriends as FriendsIcon } from "react-icons/fa";
import { ChatTemplate } from "../components/Templates/Chat";
import { SearchBlock } from "../components/SearchBlock";
import { ROUTES } from "../utils/routes";

export default function Home() {
  const { input: search, reset } = useChange();

  return (
    <ChatTemplate title="Мессенджер">

        <SearchBlock>
          <input
            placeholder="Поиск.."
            type="text"
            className={clsx("fullwidth", "search", "ml-2", "mr-2")}
            {...search}
          />
          {search.value ? (
            <CloseIcon onClick={reset} className="icon" />
          ) : (
            <CreateIcon className="icon" />
          )}
        </SearchBlock>
        <div className={styles.message}>
          <img
            src="https://sun9-49.userapi.com/impg/sLGMgnv0KGbgSnn3Q3IgOlR03zZFPIEbjSPz7A/rKJ138Y_ics.jpg?size=50x0&quality=96&crop=0,0,992,992&sign=e8316faeea4fc6385561b49a5cb17535&ava=1"
            alt="название чата"
            className={styles.imgMessage}
          />
          <A
            href={ROUTES.CHAT + 10}
            className={clsx(
              "flex flex-column p-1",
              "jcsa ml-2",
              "h100",
              "w100"
            )}
          >
            <div className={clsx("flex jcsb aic w100")}>
              <b className={styles.nameChat}>ИКБО-08-20</b>
              <span className={styles.time}>18:48</span>
            </div>
            <p className={styles.mesgText}>а по какой теме вообще</p>
          </A>
        </div>
        <div className={styles.message}>
          <img
            src="https://sun9-60.userapi.com/impg/eeVh_S4MUUi3o9ZfD62YDTxXgO-p3Ruv75tbtg/-P1gm0GwJe4.jpg?size=50x0&quality=96&crop=20,0,1000,1000&sign=61ec3c19c4a08bc64ddacdd56c62d6be&ava=1"
            alt="название чата"
            className={styles.imgMessage}
          />
          <A
            href={ROUTES.CHAT + 10}
            className={clsx(
              "flex flex-column p-1",
              "jcsa ml-2",
              "h100",
              "w100"
            )}
          >
            <div className={clsx("flex jcsb aic w100")}>
              <b className={styles.nameChat}>влажная информация</b>
              <span className={styles.time}>17:24</span>
            </div>
            <p className={styles.mesgText}>
              Ух ты, и прогуливать теперь не надо
            </p>
          </A>
        </div>
      <div className={styles.message}>
        
          <img
            src="https://sun9-58.userapi.com/s/v1/if2/YB9s9g6faW3y5gniuXZ-mF-ioCiR-2R61JMAsbiRT1tV09Opp2rnkZ5RP6fBP0jadSsTEdfzp_0n8BuDhE-JxnoI.jpg?size=50x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1"
            alt="название чата"
            className={styles.imgMessage}
          />
          <A
            href={ROUTES.CHAT + 10}
            className={clsx(
              "flex flex-column p-1",
              "jcsa ml-2",
              "h100",
              "w100"
            )}
          >
            <div className={clsx("flex jcsb aic w100")}>
              <b className={styles.nameChat}>Адель Ххххххххх</b>
              <span className={styles.time}>15:18</span>
            </div>
            <p className={styles.mesgText}>пон</p>
          </A>
        </div>
        </ChatTemplate>
  
  );
}
