import Head from "next/head";
import "nprogress/nprogress.css"; //styles of nprogres
import "../styles/globals.scss";
import { wrapper } from "../store/store";
import NextNprogress from "nextjs-progressbar";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { apiUser } from "../services/api/apiUser";
import { setUser } from "../store/ducks/user/slice";
import { ROUTES } from "../utils/routes";
import React, { createContext, useEffect, useState } from "react";
import { AppAlert, IAlert } from "../components/AppAlert";
import { useSocket } from "../hooks/useSocket";

type SocketContextProps = {
  socket:  SocketIOClient.Socket;
};

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps
);

const App = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  useSocket()
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // const isFirst = useRef(true)
  const isNotAuthPage =
    router.asPath !== ROUTES.REGISTRATION && router.asPath !== ROUTES.LOGIN;
  useEffect(() => {
    const chechAuthUser = async () => {
      try {
        const user = await apiUser.getProfile();
        const status = user.status || "Нет статуса";
        
        dispatch(setUser(Object.assign(user, { status })));
        //       setStatus(STATUS.SUCCESS)
        !isNotAuthPage && router.push(ROUTES.MESSENGER);
      } catch {
        //       setStatus(STATUS.ERROR);
        isNotAuthPage && router.push(ROUTES.LOGIN);
      } finally {
        setLoading(false);
      }
    };
    chechAuthUser();
  }, []);
  if (loading) {
    return (
      <AppAlert className="d-f aic jcc h100h" type={IAlert.INFO} {...pageProps}>
        Подождите...
      </AppAlert>
    );
  }
  // if (isFirst.current ) {
  //   isFirst.current = false
  //   if (status === STATUS.ERROR && isNotAuthPage) {
  //     return <LoginPage />;
  //   }
  //   if (!isNotAuthPage && status === STATUS.SUCCESS) {
  //     return <Home />
  //   }
  // }
  return (
      <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}

        height={2}
        options={{ speed: 500 }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
