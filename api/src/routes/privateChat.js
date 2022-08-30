const db = require("../db");
const { User, Rol, UserCards, PrivateChat, Message } = db;

const { Router } = require("express");
const chatRoute = Router();

// chatRoute.patch("/", async (req, res, next) => {

//     const { emitterId, receiverId, msg } = req.body;

//     try {
//       const [emitterProm, receiverProm, messageProm] = await Promise.all([
//         User.findOne({
//           where: { id: emitterId },
//           include: [
//             {
//               model: PrivateChat,
//               include: User,
//             },
//           ],
//         }),
//         User.findOne({
//           where: { id: receiverId },
//           include: [
//             {
//               model: PrivateChat,
//               include: User,
//             },
//           ],
//         }),
//         Message.create({ message: msg }),
//       ]);

//       let privChat = emitterProm.PrivateChats.find(
//         (pc) =>
//           pc.Users.find((u) => u.id === emitterId) &&
//           pc.Users.find((u) => u.id === receiverId)
//       );

//       if (privChat) await privChat.addMessage(messageProm);
//       else {
//         privChat = await PrivateChat.create({
//           lastSeen: [
//             { user: emitter.id, msgNum: 0 },
//             { user: receiver.id, msgNum: 0 },
//           ],
//         });
//         await privChat.addMessage(messageProm);
//         await Promise.all([
//           emitterProm.addPrivateChat(privChat),
//           receiverProm.addPrivateChat(privChat),
//         ]);
//       }
//     } catch (error) {
//       console.error(error);
//     }
// });

chatRoute.patch("/", async (req, res, next) => {
  try {
    const { userId, privChatId, msgNum } = req.body;

    if (privChatId !== "undefined" && privChatId !== undefined) {
      const privChat = await PrivateChat.findByPk(privChatId);

      await privChat.update({
        lastSeen: [
          privChat.lastSeen.find((e) => e.user !== userId),
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
    console.log(flag);
    await receiverUser.update({ notifications: flag });
    console.log(receiverUser.notifications);

    return res.json("Notifications updated!");
  } catch (error) {
    next(error);
  }
});

module.exports = chatRoute;
