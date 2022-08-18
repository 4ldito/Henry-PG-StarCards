/* eslint-disable @typescript-eslint/no-misused-promises */
const { Router } = require("express");
const db = require("../db");

const { Opinion, User, Card } = db;
const opinionRoute = Router();

// GET OPINION CARTA
opinionRoute.get("/all", async (req, res, next) => {
    try {
      const opinions = await Opinion.findAll();
      return res.send(opinions);
    } catch (error) {
      return next(error);
    }
  });
  
  opinionRoute.get("/:status", async (req, res, next) => {
    const { status } = req.params;
    try {
      const opinions = await Opinion.findAll({ where: { StatusId: status } });
      return res.send(opinions);
    } catch (error) {
      return next(error);
    }
  });

// POST Opinion 
opinionRoute.post('/', async (req, res, next)=>{
    try {
        let { comment, score, userId, cardId } = req.body;
        
        let newOpinion = await Opinion.create({
            comment,
            score,
        });
        
        let opinionUserId = await User.findOne({
            // USUARIO HARDCODEADO
            // where:{
            //     id: userId
            // }
        });
        await newOpinion.setUser(opinionUserId);

        let opinionCardId = await Card.findOne({
            where:{
                id: cardId
            }
        });
        await newOpinion.setCard(opinionCardId);
        await newOpinion.setStatus("active");

        res.status(200).json({msg: 'Opinion posted'})
    } catch (error) {
        next(error)
    }
})

  // PATCH
  module.exports = opinionRoute;