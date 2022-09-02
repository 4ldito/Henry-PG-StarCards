const { Router } = require("express");
const db = require("../db");
const { Transaction } = db;

const transactionRoute = Router();


transactionRoute.get("/", async (req, res, next) => {
  try {
    const transaction = await Transaction.findAll({ where: { StatusId: 'active' } });
    // si la transicción ya existe, no hay que volver a darle el usuario las stars
    return res.send(transaction);
  } catch (error) {
    return next(error);
  }
});

transactionRoute.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.findAll({ where: { UserId: userId, StatusId: 'active' } });
    // si la transicción ya existe, no hay que volver a darle el usuario las stars
    return res.send(transactions);
  } catch (error) {
    return next(error);
  }
});

transactionRoute.post("/", async (req, res, next) => {
  const { data: { paymentId, items, userId, type } } = req.body;

  try {
    const total = items.reduce((acc, currentValue) => acc + (Number(currentValue.unit_price) * Number(currentValue.quantity)), 0);

    const transaction = await Transaction.create({ type, paymentId, priceMoney: total });
    await Promise.all([transaction.setUser(userId), transaction.setStatus('active')]);
    // await transaction.setUser(userId);
    // await transaction.setStatus('active');

    items.forEach(async item => {
      await transaction.addStarsPack(item.id);
    });
    return res.send(transaction);
  } catch (error) {
    return next(error);
  }
});

transactionRoute.get("/paymentId/:paymentId", async (req, res, next) => {
  const paymentId = Number(req.params.paymentId);
  try {
    const transaction = await Transaction.findOne({ where: { paymentId } });
    // si la transicción ya existe, no hay que volver a darle el usuario las stars
    if (transaction) return res.send(true);
    return res.send(false);
  } catch (error) {
    return next(error);
  }
});

module.exports = transactionRoute;
