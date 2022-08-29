const db = require("../db");
const { User, Rol, UserCards, PrivateChat, Message } = db;

const { Router } = require("express");
const chatRoute = Router();

chatRoute.patch("/", async (req, res, next) => {
  try {
    const { emitterId, receiverId, msg } = req.body;

    const [emitter, receiver, message] = await Promise.all([
      User.findOne({
        where: { id: emitterId },
        include: [
          {
            model: PrivateChat,
            include: User,
          },
        ],
      }),
      User.findOne({
        where: { id: receiverId },
        include: [
          {
            model: PrivateChat,
            include: User,
          },
        ],
      }),
      Message.create({ message: msg }),
    ]);

    let privChat = emitter.PrivateChats.find(
      (pc) =>
        pc.Users.find((u) => u.id === emitterId) &&
        pc.Users.find((u) => u.id === receiverId)
    );

    if (privChat) await privChat.addMessage(message);
    else {
      privChat = await PrivateChat.create();
      await privChat.addMessage(message);
      await Promise.all([
        emitter.addPrivateChat(privChat),
        receiver.addPrivateChat(privChat),
      ]);
    }

    return res.json(privChat);
  } catch (error) {
    next(error);
  }
});

module.exports = chatRoute;
