import Card from "../../models/card/Card.js";
import _ from 'lodash';
import { createError } from "../../utils/handleErrors.js";

const checkBizNumber = async (bizNumber) => {
  try {
    const bizNum = await Card.findOne({ bizNumber });
    return Boolean(bizNum);
  } catch (error) {
    error.status = 500;
    return createError('Mongoose', error);
  }
}

const generateBizNumber = async () => {
  const cardsCount = await Card.find().countDocuments();
  if (cardsCount === 9_000_000) {
    const error = new Error('You have reached the maximum cards count in your system');
    error.status = 507;
    return createError('Mongoose', error);
  }

  let availableBizNumber = false;
  while (!availableBizNumber) {
    // const bizNumber = Math.floor((Math.random() * 9_000_000) + 1_000_000);
    // Or, use lodash library:
    const bizNumber = _.random(1_000_000, 9_999_999);

    const takenBizNumber = await checkBizNumber(bizNumber)

    if (!takenBizNumber) {
      availableBizNumber = true;
      return bizNumber;
    }
  }
}

export { generateBizNumber, checkBizNumber };