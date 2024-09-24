import registerValidation from "./registerValidation.js";
import loginValidation from "./loginValidation.js";
import config from "config";

const validator = config.get('VALIDATOR');

const validateRegistration = (user) => {
  if (validator === "joi") {
    const { error } = registerValidation(user);
    if (error) return error.details[0].message;
    return "";
  }
};

const validateLogin = (user) => {
  if (validator === "joi") {
    const { error } = loginValidation(user);
    if (error) return error.details[0].message;
    return "";
  }
};

export { validateRegistration, validateLogin };