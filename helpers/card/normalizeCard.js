import { generateBizNumber } from "./generateBizNumber.js";

const normalizeCard = async (card, userId) => {
  return {
    ...card,
    image: {
      url: card.image.url || 'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg',
      alt: card.image.alt || 'Business card image',
    },
    bizNumber: card.bizNumber || (await generateBizNumber()),
    user_id: card.user_id || userId,
  }
}

export default normalizeCard;