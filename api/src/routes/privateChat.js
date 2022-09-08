const db = require("../db");
const { User, PrivateChat, Message } = db;

const { Router } = require("express");
const chatRoute = Router();

// chatRoute.post("/db", async (req, res, next) => {
//   const { emitter, receiver, msg } = req.body;

//   try {
//     const [emitterProm, receiverProm, messageProm] = await Promise.all([
//       User.findOne({
//         where: { id: emitter.id },
//         include: [
//           {
//             model: PrivateChat,
//             include: User,
//           },
//         ],
//       }),
//       User.findOne({
//         where: { id: receiver.id },
//         include: [
//           {
//             model: PrivateChat,
//             include: User,
//           },
//         ],
//       }),
//       Message.create({ message: msg, emitter: emitter }),
//     ]);

//     let privChat = emitterProm.PrivateChats.find(
//       (pc) =>
//         pc.Users.find((u) => u.id === emitter.id) &&
//         pc.Users.find((u) => u.id === receiver.id)
//     );

//     if (privChat) await privChat.addMessage(messageProm);
//     else {
//       privChat = await PrivateChat.create({
//         lastSeen: [
//           { user: emitter.id, msgNum: 0 },
//           { user: receiver.id, msgNum: 0 },
//         ],
//       });
//       await privChat.addMessage(messageProm);
//       await Promise.all([
//         emitterProm.addPrivateChat(privChat),
//         receiverProm.addPrivateChat(privChat),
//       ]);
//     }

//     const currentReceiver = userSockets.find((u) => u.userId === receiver.id);
//     if (currentReceiver)
//       io.to(currentReceiver.socket).emit(
//         "privateMessage",
//         emitter,
//         msg,
//         privChat.id
//       );

//     // const currentUser = userSockets.find((u) => u.userId === emitter.id);
//     // io.to(currentUser.socket).emit(
//     //   "privateMessage",
//     //   receiver,
//     //   msg,
//     //   privChat.id
//     // );
//     return res.send("chat db modified!");
//   } catch (error) {
//     next(error);
//   }
// });

chatRoute.patch("/", async (req, res, next) => {
  try {
    const { userId, privChatId, msgNum } = req.body;

    if (privChatId !== "undefined" && privChatId !== undefined) {
      const privChat = await PrivateChat.findByPk(privChatId);

      await privChat.update({
        lastSeen: [
          { ...privChat.lastSeen.find((e) => e.user !== userId) },
          { user: userId, msgNum },
        ],
      });
    }

    return res.json("LastSeen updated!");
  } catch (error) {
    next(error);
  }
});

chatRoute.patch("/notifications", async (req, res, next) => {
  try {
    const { receiverId, flag } = req.body;
    const receiverUser = await User.findByPk(receiverId);

    await receiverUser.update({ notifications: flag });

    return res.json("Notifications updated!");
  } catch (error) {
    next(error);
  }
});

module.exports = chatRoute;
