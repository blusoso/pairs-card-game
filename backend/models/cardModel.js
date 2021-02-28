const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  value: { type: Number, required: true },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
