import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChatNotification } from "../../../redux/actions/user";
import socket from "../../../../Socket";
import css from "../Nav.module.css"

const ChatNotifications = () => {
  const dispatch = useDispatch();
  const userActive = useSelector((state) => state.userReducer.user);
  const chatNotificationFlag = useSelector(
    (state) => state.userReducer.chatNotification
  );
  const [notification, setNotification] = useState(chatNotificationFlag);

  useEffect(() => {
    if (userActive) {
      setNotification(userActive.notifications);
      socket.emit("connectUserNotifications", userActive.id);
    }
    return () => {
      socket.emit("disconnectUserNotifications", userActive.id);
    };
  }, [userActive]);

  socket.on("chatNotification", (notificationFlag) => {
    setNotification(notificationFlag);
    dispatch(setChatNotification(notificationFlag));
  });

  useEffect(() => {
    setNotification(chatNotificationFlag);
  }, [chatNotificationFlag]);

  return <>{notification ? <div className={css.chatNot}/> : <></>}</>;
};

export default ChatNotifications;
