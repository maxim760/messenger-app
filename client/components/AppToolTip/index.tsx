import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "./tooltip.module.scss";
// import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
import "react-toastify/dist/ReactToastify.min.css";
import { selectLatestNotify } from "../../store/ducks/notify/selectors";
import { Avatar } from "../Avatar";
import { ROUTES } from "../../utils/routes";

export const AppToolTip: React.FC = () => {
  const latestNot = useSelector(selectLatestNotify);
  const router = useRouter();
  useEffect(() => {
    const href = latestNot.type === "friends" ? ROUTES.FRIENDS : ROUTES.MESSENGER
    const onClick = () => router.push(href);
    notify &&
      toast(notify, {
        position: "bottom-left",
        closeOnClick: !href,
        progressStyle: { background: "#7B68EE" },
        autoClose: 4000,
        onClick
      });
  }, [latestNot]);

  const notify: React.ReactNode = latestNot.text ? (
    <div className="flex aic jcsb">
      <Avatar
        src={latestNot.avatar}
        width="30px"
        height="30px"
        className="mr-2"
      />
      <span>{latestNot.text}</span>
    </div>
  ) : null;

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
