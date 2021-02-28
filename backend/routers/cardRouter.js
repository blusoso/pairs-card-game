const express = require('express');
const Card = require('../models/cardModel');

const cardRouter = express.Router();

cardRouter.get('/seed', async (req, res) => {
  let cards = [];
  for (let i = 0; i <= 1; i++) {
    for (let j = 1; j <= 6; j++) {
      cards.push({ value: j });
    }
  }

  const createdCards = await Card.insertMany(cards);

  res.json({
    status: 'success',
    message: 'Seed card success!',
    data: createdCards,
  });
});

cardRouter.get('/', async (req, res) => {
  const cards = await Card.find();

  // Shuffle cards
  let i = cards.length;
  while (i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[ri]] = [cards[ri], cards[i]];
  }

  res.json({
    status: 'success',
    message: 'Query all cards success!',
    data: cards,
  });
});

module.exports = cardRouter;
