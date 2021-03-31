import clsx from "clsx";
import React, { useLayoutEffect } from "react";
import { A } from "../../components/A";
import { AppBack } from "../../components/AppBack";
import { ChatTemplate } from "../../components/Templates/Chat";
import { ROUTES } from "../../utils/routes";
import styles from "./chat.module.scss";

import { ImAttachment as IconAttach } from "react-icons/im";
import { FiCamera as IconCamera } from "react-icons/fi";
import { BiMicrophone as IconMicro } from "react-icons/bi";
import { VscSmiley as IconSmile } from "react-icons/vsc";
import { BiSend as IconSend } from "react-icons/bi";
import { HiOutlinePlay as IconVideo } from "react-icons/hi";
import { HiOutlineMusicNote as IconMusic } from "react-icons/hi";
import { BsFileEarmark as IconFile } from "react-icons/bs";

import { useChange } from "../../hooks/useChange";
import { ACCEPTS } from "../../utils/accepts";

const ChatPage: React.FC = ({}): React.ReactElement => {
  useLayoutEffect(() => {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
  }, []);
  const { input: message, reset } = useChange();
  return (
    <ChatTemplate title="Мессенджер" className={styles.page} withoutOffset>
      <div className={styles.wrap}>
        <div className={styles.header}>
          <AppBack className={styles.back} />
          <div className={styles.wrapName}>
            <span className={styles.nameTitle}>Адель Ххххххх</span>
            <span className={styles.onlineInfo}>
              был в сети 51 минуту назад
            </span>
          </div>
          <A href={ROUTES.PROFILE + "/" + 22}>
            <img
              className={styles.userImg}
              src="https://sun9-58.userapi.com/s/v1/if2/YB9s9g6faW3y5gniuXZ-mF-ioCiR-2R61JMAsbiRT1tV09Opp2rnkZ5RP6fBP0jadSsTEdfzp_0n8BuDhE-JxnoI.jpg?size=50x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1"
              alt="Фото"
            />
          </A>
        </div>
        <div className={styles.chat}>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-58.userapi.com/s/v1/if2/YB9s9g6faW3y5gniuXZ-mF-ioCiR-2R61JMAsbiRT1tV09Opp2rnkZ5RP6fBP0jadSsTEdfzp_0n8BuDhE-JxnoI.jpg?size=50x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Адель</span>
                <span className={styles.time}>20:27</span>
              </div>
              <span className={styles.msgText}>Чет затупил, спасибо</span>
            </div>
          </div>
          <p className={styles.date}>28 марта</p>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-58.userapi.com/s/v1/if2/YB9s9g6faW3y5gniuXZ-mF-ioCiR-2R61JMAsbiRT1tV09Opp2rnkZ5RP6fBP0jadSsTEdfzp_0n8BuDhE-JxnoI.jpg?size=50x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Адель</span>
                <span className={styles.time}>14:15</span>
              </div>
              <span className={styles.msgText}>
                привет, делал 4_1_1 в авроре?
              </span>
            </div>
          </div>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-65.userapi.com/s/v1/if2/4tbrT3w4Xckj3K-3mxvWIF8OHqw_lYk9b5k1dT0d6w-dJFEzVTT6b0fUW18LCvy31mKyxRnM-vI41J_Z-CvG_ZLE.jpg?size=50x0&quality=96&crop=704,0,1439,1439&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Максим</span>
                <span className={styles.time}>14:48</span>
              </div>
              <span className={styles.msgText}>
                Привет, нет, этот номер завтра объяснять будут
              </span>
            </div>
          </div>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-58.userapi.com/s/v1/if2/YB9s9g6faW3y5gniuXZ-mF-ioCiR-2R61JMAsbiRT1tV09Opp2rnkZ5RP6fBP0jadSsTEdfzp_0n8BuDhE-JxnoI.jpg?size=50x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Адель</span>
                <span className={styles.time}>15:11</span>
              </div>
              <span className={styles.msgText}>ого ну ладно</span>
            </div>
          </div>
          <div className={styles.message}>
            <div className={styles.msgWrap}>
              <span className={styles.msgText}>
                ты по мат логике как-нибудь тренируешься на задачках?
              </span>
            </div>
          </div>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-65.userapi.com/s/v1/if2/4tbrT3w4Xckj3K-3mxvWIF8OHqw_lYk9b5k1dT0d6w-dJFEzVTT6b0fUW18LCvy31mKyxRnM-vI41J_Z-CvG_ZLE.jpg?size=50x0&quality=96&crop=704,0,1439,1439&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Максим</span>
                <span className={styles.time}>15:15</span>
              </div>
              <span className={styles.msgText}>
                Я лекции смотрю, там в последние 20-30 минут пример где-то
                разбирается, я разбираюсь в нем
              </span>
            </div>
          </div>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-58.userapi.com/s/v1/if2/YB9s9g6faW3y5gniuXZ-mF-ioCiR-2R61JMAsbiRT1tV09Opp2rnkZ5RP6fBP0jadSsTEdfzp_0n8BuDhE-JxnoI.jpg?size=50x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Адель</span>
                <span className={styles.time}>15:18</span>
              </div>
              <span className={styles.msgText}>пон</span>
            </div>
          </div>
          <p className={styles.date}>Вчера</p>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-65.userapi.com/s/v1/if2/4tbrT3w4Xckj3K-3mxvWIF8OHqw_lYk9b5k1dT0d6w-dJFEzVTT6b0fUW18LCvy31mKyxRnM-vI41J_Z-CvG_ZLE.jpg?size=50x0&quality=96&crop=704,0,1439,1439&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Максим</span>
                <span className={styles.time}>20:01</span>
              </div>
              <span className={styles.msgText}>
                Адель, привет А по ооп, когда в классе apllication , создаём
                child, родителем может быть только то что хранится в свойствах
                temp_parent и temp_child, или любой обьект который до этого
                создан
              </span>
            </div>
          </div>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-58.userapi.com/s/v1/if2/YB9s9g6faW3y5gniuXZ-mF-ioCiR-2R61JMAsbiRT1tV09Opp2rnkZ5RP6fBP0jadSsTEdfzp_0n8BuDhE-JxnoI.jpg?size=50x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Адель</span>
                <span className={styles.time}>20:27</span>
              </div>
              <span className={styles.msgText}>Чет затупил, спасибо</span>
            </div>
          </div>
          <p className={styles.date}>28 марта</p>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-58.userapi.com/s/v1/if2/YB9s9g6faW3y5gniuXZ-mF-ioCiR-2R61JMAsbiRT1tV09Opp2rnkZ5RP6fBP0jadSsTEdfzp_0n8BuDhE-JxnoI.jpg?size=50x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Адель</span>
                <span className={styles.time}>14:15</span>
              </div>
              <span className={styles.msgText}>
                привет, делал 4_1_1 в авроре?
              </span>
            </div>
          </div>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-65.userapi.com/s/v1/if2/4tbrT3w4Xckj3K-3mxvWIF8OHqw_lYk9b5k1dT0d6w-dJFEzVTT6b0fUW18LCvy31mKyxRnM-vI41J_Z-CvG_ZLE.jpg?size=50x0&quality=96&crop=704,0,1439,1439&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Максим</span>
                <span className={styles.time}>14:48</span>
              </div>
              <span className={styles.msgText}>
                Привет, нет, этот номер завтра объяснять будут
              </span>
            </div>
          </div>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-58.userapi.com/s/v1/if2/YB9s9g6faW3y5gniuXZ-mF-ioCiR-2R61JMAsbiRT1tV09Opp2rnkZ5RP6fBP0jadSsTEdfzp_0n8BuDhE-JxnoI.jpg?size=50x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Адель</span>
                <span className={styles.time}>15:11</span>
              </div>
              <span className={styles.msgText}>ого ну ладно</span>
            </div>
          </div>
          <div className={styles.message}>
            <div className={styles.msgWrap}>
              <span className={styles.msgText}>
                ты по мат логике как-нибудь тренируешься на задачках?
              </span>
            </div>
          </div>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-65.userapi.com/s/v1/if2/4tbrT3w4Xckj3K-3mxvWIF8OHqw_lYk9b5k1dT0d6w-dJFEzVTT6b0fUW18LCvy31mKyxRnM-vI41J_Z-CvG_ZLE.jpg?size=50x0&quality=96&crop=704,0,1439,1439&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Максим</span>
                <span className={styles.time}>15:15</span>
              </div>
              <span className={styles.msgText}>
                Я лекции смотрю, там в последние 20-30 минут пример где-то
                разбирается, я разбираюсь в нем
              </span>
            </div>
          </div>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-58.userapi.com/s/v1/if2/YB9s9g6faW3y5gniuXZ-mF-ioCiR-2R61JMAsbiRT1tV09Opp2rnkZ5RP6fBP0jadSsTEdfzp_0n8BuDhE-JxnoI.jpg?size=50x0&quality=96&crop=297,384,1536,1536&rotate=90&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Адель</span>
                <span className={styles.time}>15:18</span>
              </div>
              <span className={styles.msgText}>пон</span>
            </div>
          </div>
          <p className={styles.date}>Вчера</p>
          <div className={styles.message}>
            <img
              className={styles.chatImg}
              src="https://sun9-65.userapi.com/s/v1/if2/4tbrT3w4Xckj3K-3mxvWIF8OHqw_lYk9b5k1dT0d6w-dJFEzVTT6b0fUW18LCvy31mKyxRnM-vI41J_Z-CvG_ZLE.jpg?size=50x0&quality=96&crop=704,0,1439,1439&ava=1"
              alt="Фото"
            />
            <div className={styles.msgWrap}>
              <div className="d-ib">
                <span className={styles.msgName}>Максим</span>
                <span className={styles.time}>20:01</span>
              </div>
              <span className={styles.msgText}>
                Адель, привет А по ооп, когда в классе apllication , создаём
                child, родителем может быть только то что хранится в свойствах
                temp_parent и temp_child, или любой обьект который до этого
                создан
              </span>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.wrapAttach}>
            <IconAttach className={clsx("icon", styles.icon)} />
            <div className={clsx(styles.attachBlock, "pb-5")}>
              <ul className={styles.attachField}>
                <li className={styles.attachFieldItem}>
                  <label>
                    <input accept={ACCEPTS.IMAGE} type="file" hidden />
                    <IconCamera className={styles.miniIcon} />
                    <span className={styles.attachName}>Фотография</span>
                  </label>
                </li>
                <li className={styles.attachFieldItem}>
                  <label>
                    <input accept={ACCEPTS.VIDEO} type="file" hidden />
                    <IconVideo className={styles.miniIcon} />
                    <span className={styles.attachName}>Видеозапись</span>
                  </label>
                </li>
                <li className={styles.attachFieldItem}>
                  <label>
                    <input accept={ACCEPTS.AUDIO} type="file" hidden />
                    <IconMusic className={styles.miniIcon} />
                    <span className={styles.attachName}>Аудиозапись</span>
                  </label>
                </li>
                <li className={styles.attachFieldItem}>
                  <label>
                    <input type="file" hidden />
                    <IconFile className={styles.miniIcon} />
                    <span className={styles.attachName}>Файл</span>
                  </label>
                </li>
              </ul>
              </div>
          </div>
          <div className={clsx("relative w100")}>
            <input
              {...message}
              type="text"
              placeholder="Написать сообщение"
              className={clsx("w100", styles.input)}
            />
            <div className={clsx("absolute aic flex t-0 b-0 r-0 h100")}>
              <IconCamera className={clsx("icon", styles.icon)} />
              <IconSmile className={clsx("icon", styles.icon)} />
            </div>
          </div>
          {message.value ? (
            <IconSend className={clsx("icon", styles.icon)} />
          ) : (
            <IconMicro className={clsx("icon", styles.icon)} />
          )}
        </div>
      </div>
    </ChatTemplate>
  );
};

export default ChatPage;
