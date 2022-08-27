import io from "socket.io-client";

const chat = {
  url: import.meta.env.VITE_CHAT_URL,
};

let socket = io("http://localhost:3001/");

export default socket;
