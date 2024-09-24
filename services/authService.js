import config from "config";
import { verifyToken } from "../providers/jwt.js";
import { createError, handleError } from "../utils/handleErrors.js";
const tokenGenerator = config.get('TOKEN_GENERATOR');

const authLoggedUser = (req, res, next) => {
  try {
    if (tokenGenerator !== 'jwt') {
      return handleError(res, 500, 'You are not using a JWT generator');
    }

    const authToken = req.header('x-auth-token');
    if (!authToken) {
      const error = new Error('Please Login');
      error.status = 401;
      return createError('Authentication', error);
    }

    const user = verifyToken(authToken);
    if (!user) {
      const error = new Error('Unauthorized User');
      error.status = 401;
      return createError('Authentication', error);
    }
    res.locals.user = user;
    return next();

  } catch (error) {
    return handleError(res, 401, error.message);
  }
}

const authIsBusiness = (req, res, next) => {
  try {
    const payload = res.locals.user;
    if (!payload.isBusiness) return handleError(res, 403, 'Unauthorised User');
    return next();
  } catch (error) {
    return handleError(res, 401, error.message);
  }
}

export { authLoggedUser, authIsBusiness };