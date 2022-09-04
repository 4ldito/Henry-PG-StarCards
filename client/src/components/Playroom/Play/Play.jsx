import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  setChatNotification,
  setOutNotifications,
  setLastSeenMsg,
} from "../../../redux/actions/user";
import socket from "../../../../Socket";

import css from "./PrivateChat.module.css";

const Play = () => {
  const dispatch = useDispatch();

  const userActiveGlobal = useSelector((state) => state.userReducer.user);
  const [actualChatUser, setActualChatUser] = useState(selected);

  const [userActive, setUserActive] = useState(userActiveGlobal);

  useEffect(() => {
    setUserActive(userActiveGlobal);
  }, [userActiveGlobal]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});

  const [privChatId, setPrivChatId] = useState();

  function handleChatSelect(c) {
    setActualChatUser(c);
  }

  useEffect(() => {
    if (actualChatUser) {
      const privateChat = userActive.PrivateChats.find((pc) =>
        pc.Users.find((u) => u.id === actualChatUser.id)
      );

      if (privateChat)
        dispatch(
          setLastSeenMsg(
            userActive.id,
            privateChat.id,
            messages[actualChatUser?.id]?.Messages.length
          )
        );
      else
        dispatch(
          setLastSeenMsg(
            userActive.id,
            privChatId,
            messages[actualChatUser?.id]?.Messages.length
          )
        );

      let privInfo;
      const chatWithUser = chatUsers.find((c) => c.id === actualChatUser.id);

      if (chatWithUser) {
        privInfo = messages[actualChatUser.id]?.Messages;
      } else {
        privInfo = privateChat?.Messages;
      }

      setMessages((prev) => ({
        ...prev,
        [actualChatUser.id]: {
          // username: actualChatUser.username,
          // id: actualChatUser.id,
          Messages: privInfo,
        },
      }));
    }
  }, [actualChatUser]);

  useEffect(() => {
    dispatch(getUser(userActive.id));
    dispatch(setChatNotification(false));
    dispatch(setOutNotifications(userActive.id, false));
  }, []);

  const [chatUsers, setChatUsers] = useState([]);
  useEffect(() => {
    if (userActive) {
      setChatUsers(() =>
        userActive.PrivateChats.map((c) => {
          const user = c.Users.find((u) => u.id !== userActive.id);
          return {
            username: user.username,
            id: user.id,
            lastSeen: c.lastSeen.find((e) => e.user === userActive.id).msgNum,
          };
        })
      );
      setMessages(() => {
        let oldMessages = {};
        userActive.PrivateChats.forEach((pc) => {
          const receiver = pc.Users.find((u) => u.id !== userActive.id);
          oldMessages = {
            ...oldMessages,
            [receiver.id]: {
              // username: receiver.username,
              // id: receiver.id,
              Messages: pc.Messages,
            },
          };
        });

        return { ...oldMessages };
      });
      socket.emit("connectPrivateSocket", userActive.id);
    }

    return () => {
      socket.emit("disconnectPrivateSocket", userActive.id);
    };
  }, [userActive]);

  useEffect(() => {
    socket.on("privateMessage", (user, message, privChatId) => {
      setPrivChatId(privChatId);

      if (chatUsers.find((c) => c.id === user.id) === undefined)
        setChatUsers((prev) => [
          ...prev,
          { username: user.username, id: user.id },
        ]);

      setMessages((prev) => {
        const oldMessages = prev[user.id]?.Messages || [];
        return {
          ...prev,
          [user.id]: {
            // username: user.username,
            // id: user.id,
            Messages: [...oldMessages, { emitter: user, message }],
          },
        };
      });

      if (actualChatUser?.id === user.id)
        dispatch(
          setLastSeenMsg(
            userActive.id,
            privChatId,
            messages[actualChatUser?.id]?.Messages.length + 1
          )
        );
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "auto" });
  }, [divRef.current, messages]);

  const submit = (e) => {
    e.preventDefault();
    socket.emit("privateMessage", userActive, actualChatUser, message);
    setMessage("");

    setMessages((prev) => {
      const oldMessages = prev[actualChatUser.id]?.Messages || [];
      return {
        ...prev,
        [actualChatUser.id]: {
          // username: user.username,
          // id: user.id,
          Messages: [...oldMessages, { emitter: userActive, message }],
        },
      };
    });

    const privateChat = userActive.PrivateChats.find((pc) => {
      return pc.Users.find((u) => u.id === actualChatUser.id) ? true : false;
    });

    dispatch(
      setLastSeenMsg(
        userActive.id,
        privateChat.id,
        messages[actualChatUser.id].Messages.length + 1
      )
    );
  };

  const readMsgs = (c) => {
    return userActive.PrivateChats.find((pc) =>
      pc.Users.find((u) => u.id === c.id)
    )?.lastSeen.find((e) => e.user === userActive.id).msgNum;
  };
  const unreadMsgs = (c) => {
    return messages[c.id]?.Messages.length;
  };

  return (
    <div className={css.chatContainer}>
      <div className={css.chatUsers}>
        {chatUsers?.length
          ? chatUsers.map((c, i) => {
              return (
                <div
                  key={i}
                  id={c.id}
                  onClick={() => handleChatSelect(c)}
                  className={css.singleChatUser}
                >
                  {c.username}{" "}
                  {actualChatUser && actualChatUser.id === c.id
                    ? ""
                    : readMsgs(c) === undefined
                    ? "New"
                    : readMsgs(c) < unreadMsgs(c)
                    ? `${unreadMsgs(c) - readMsgs(c)}`
                    : ""}
                </div>
              );
            })
          : "No chats"}
      </div>
      <div className={css.chatBodyContainer}>
        <div className={css.chatText}>
          {actualChatUser
            ? messages[actualChatUser.id]
              ? messages[actualChatUser.id].Messages?.map((e, i) => (
                  <div key={i}>
                    {e.emitter.username}: {e.message}
                  </div>
                ))
              : ""
            : ""}
          <div ref={divRef}></div>
        </div>

        {actualChatUser ? (
          <form onSubmit={submit} className={css.chatForm}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={message}
              placeholder="Escribe tu mensaje"
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") submit(e);
              }}
              className={css.textArea}
            />
            <input type="submit" value="Enviar" />
          </form>
        ) : (
          "Selecciona un chat"
        )}
      </div>
    </div>
  );
};

export default Play;
