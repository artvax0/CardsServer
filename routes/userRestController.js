import { Router } from "express";
import { getUser, getUsers, login, registerUser } from "../services/user/userAccessDataService.js";
import { authLoggedUser } from "../services/authService.js";
import { handleError } from "../utils/handleErrors.js";
import { validateLogin, validateRegistration } from "../services/validation/userValidationService.js";

const router = Router();

router.post('/', async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.send(user);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
})

router.get('/', authLoggedUser, async (req, res) => {
  try {
    const payload = res.locals.user;
    if (!payload.isAdmin) return handleError(res, 403, 'Only admin users can view all the users');

    const users = await getUsers();
    res.send(users);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
})

router.get('/:id', authLoggedUser, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = res.locals.user;
    if (!payload.isAdmin) {
      if (payload._id !== id) return handleError(res, 403, 'Only the user can view their own user');
    }

    // const error = validateRegistration(req.body);
    // if (error) return handleError(res, 400, `Joi Error: ${error}`);

    const user = await getUser(id);
    res.send(user);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
})

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    const error = validateLogin(req.body);
    if (error) return handleError(res, 400, `Joi Error: ${error}`);

    const token = await login(email, password);
    res.send(token);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

export default router;