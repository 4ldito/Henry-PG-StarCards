import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChatNotification } from "../../../redux/actions/user";
import socket from "../../../../Socket";

const ChatNotifications = () => {
  const userActive = useSelector((state) => state.userReducer.user);
  const chatNotificationFlag = useSelector(
    (state) => state.userReducer.chatNotification
  );
  const [notification, setNotification] = useState(chatNotificationFlag);

  useEffect(() => {
    if (userActive) socket.emit("connectUserNotifications", userActive.id);
    return () => {
      socket.emit("disconnectUserNotifications", userActive.id);
    };
  }, [userActive]);

  useEffect(() => {
    socket.on("chatNotification", (notificationFlag) => {
      setNotification(notificationFlag);
      dispatchEvent(setChatNotification(notificationFlag));
    });

    return () => {
      socket.off();
    };
  }, [notification]);

  return <div>NOTIFICACION DE CHAT</div>;
};

export default ChatNotifications;
