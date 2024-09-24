import config from "config";
import Card from "../../models/card/Card.js";
import { createError } from "../../utils/handleErrors.js";
const database = config.get("DB");

const createCard = async (newCard) => {
  if (database === 'mongodb') {
    try {
      console.log(newCard);
      let card = new Card(newCard);
      card = await card.save();
      return card;
    } catch (error) {
      return createError('Mongoose', error);
    }
  }
  const error = new Error('There is no other database for this request');
  error.status = 500;
  return createError('Database', error);
};

const getCards = async () => {
  try {
    let cards = await Card.find();
    return cards;
  } catch (error) {
    return createError('Mongoose', error);
  }
}

const getCard = async (cardId) => {
  try {
    let card = await Card.findById(cardId);
    return card;
  } catch (error) {
    return createError('Mongoose', error);
  }
}

const getMyCards = async (userId) => {
  try {
    let cards = await Card.find({ user_id: userId });
    return cards;
  } catch (error) {
    return createError('Mongoose', error);
  }
}

const updateCard = async (cardId, updatedCard) => {
  try {
    let card = await Card.findByIdAndUpdate(cardId, updatedCard, { new: true });
    return card;
  } catch (error) {
    return createError('Mongoose', error);
  }
}

const changeBizNumer = async (cardId, newBizNumber) => {
  try {
    let card = await Card.findByIdAndUpdate(cardId, { bizNumber: newBizNumber }, { new: true });
    return card;
  } catch (error) {
    return createError('Mongoose', error);
  }
}

const likeCard = async (cardId, userId) => {
  try {
    let card = await Card.findById(cardId);
    if (!card) {
      const error = new Error('Card not found');
      error.status = 404;
      return createError('Mongoose', error);
    }

    if (card.likes.includes(userId)) {
      card.likes = card.likes.filter(id => id != userId);
    } else {
      card.likes.push(userId);
    }

    await card.save();
    return card;
  } catch (error) {
    return createError('Mongoose', error);
  }
}

const deleteCard = async (cardId, userId) => {
  try {
    let card = await Card.findById(cardId);
    if (card.user_id == userId) {
      await Card.findByIdAndDelete(cardId);
      return card;
    } else {
      const error = new Error('Not the owner of this card');
      error.status = 403;
      return createError('Authorization', error);
    }
  } catch (error) {
    return createError('Mongoose', error);
  }
}

export { createCard, getCards, getCard, getMyCards, updateCard, changeBizNumer, likeCard, deleteCard };