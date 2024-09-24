import { Router } from "express";
import { changeBizNumer, createCard, deleteCard, getCard, getCards, getMyCards, likeCard, updateCard } from "../services/card/cardAccessDataService.js";
import { authLoggedUser } from "../services/authService.js";
import { handleError } from "../utils/handleErrors.js";
import normalizeCard from "../helpers/card/normalizeCard.js";
import validateCard from "../services/validation/cardValidationService.js";

const router = Router();

router.post('/', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isBusiness) return handleError(res, 403, 'Only business user can create a new card');
    }

    const errorMessage = validateCard(req.body);
    if (errorMessage !== '') {
      return handleError(res, 400, `Validation error:  + ${errorMessage}`);
    }

    let card = await normalizeCard(req.body, payload._id);
    card = await createCard(card);
    res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.stauts || 400, error.message);
  }
})

router.get('/', async (req, res) => {
  try {
    let cards = await getCards();
    res.send(cards);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
})

router.get('/my-cards', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (!payload.isBusiness) return handleError(res, 403, 'Only business user can view their cards');
    }
    let cards = await getMyCards(payload._id);
    res.send(cards);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
})

router.get(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    let card = await getCard(id);
    res.send(card);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
})

router.put('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      const cardInfo = await getCard(id);
      if (!payload._id == cardInfo.user_id) return handleError(res, 403, 'Only the owner of this card can update their cards');
    }

    const errorMessage = validateCard(req.body);
    if (errorMessage !== '') {
      return handleError(res, 400, `Validation error:  + ${errorMessage}`);
    }

    let card = await normalizeCard(req.body, payload._id);
    card = await updateCard(id, card);
    res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.stauts || 400, error.message);
  }
})

router.patch('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (Object.keys(req.body).includes('bizNumber')) {
      // Biz Number Patching
      if (!payload.isAdmin) {
        const cardInfo = await getCard(id);
        if (!payload.isBusiness && payload._id == cardInfo.user_id) return handleError(res, 403, 'Only business users can update their own cards');
      }
      const { bizNumber } = req.body;
      let card = await changeBizNumer(id, bizNumber);
      res.status(201).send(card);
    } else {
      // Like Patching
      let card = await likeCard(id, payload._id);
      res.status(201).send(card);
    }
  } catch (error) {
    return handleError(res, 400, error.message);
  }
})

router.delete('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      const cardInfo = await getCard(id);
      if (!payload.isBusiness && payload._id == cardInfo.user_id) return handleError(res, 403, 'Only business users can update their own cards');
    }
    let card = await deleteCard(id, payload._id);
    res.send(card);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
})

export default router;