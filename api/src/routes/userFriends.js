/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require("express");
const db = require("../db");

const { User, Friends } = db;
const userFriends = Router();

userFriends.get(`/`, async (req, res, next) => {
    const { userId } = req.query;
    try { if(userId) {
      const friends = await User.findByPk(userId, { include: { model: User, as: 'friends' } });
      return res.send(friends.friends);}
      else {return res.send('no hay usuario')}
    } catch (error) {
      return next(error);
    }
});

userFriends.post("/", async (req, res, next) => {
    try {
        let { userId, friendId } = req.body;
        let  user = await User.findByPk(userId);
        let friend = await User.findByPk(friendId);
        
        await user.addFriend(friend)
        const userFriends = await User.findByPk( userId , {include:Friends} );
        return res.send(friend)
    } catch (error) {
        next(error)
    }
})

userFriends.delete("/", async (req, res, next) => {
    try {
        let {userId, friendId}  = req.body;
        let  user = await User.findByPk(userId, { include: { model: User, as: 'friends' } });
        let friend = await User.findByPk(friendId, { include: { model: User, as: 'friends' } });

        await user.removeFriend(friend)
        const userFriends = await User.findByPk( userId , {include:{ model: User, as: 'friends' }} );
        return res.send(userFriends.friends)
    } catch (error) {
        next(error)
    }
})
module.exports = userFriends;