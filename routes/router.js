import { Router } from "express";
import cardsRouter from "./cardsRestController.js";
import userRouter from "./userRestController.js";
import { handleError } from "../utils/handleErrors.js";

const router = Router();
router.use("/cards", cardsRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  return handleError(res, 404, 'Path not found');
});

export default router;

