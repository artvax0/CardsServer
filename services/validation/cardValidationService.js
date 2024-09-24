import validateCardWithJoi from "./cardValidation.js";

const validator = "Joi";

const validateCard = (card) => {
  if (validator === "Joi") {
    const { error } = validateCardWithJoi(card);
    if (error) return error.details[0].message;
    return "";
  }
};

export default validateCard;