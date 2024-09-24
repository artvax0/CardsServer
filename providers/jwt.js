import jwt from "jsonwebtoken";
import 'dotenv/config'

const generateAuthToken = ({ _id, isBusiness, isAdmin }) => {
  const token = jwt.sign({ _id, isBusiness, isAdmin }, process.env.JWT_SECRET);
  return token;
}

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export { generateAuthToken, verifyToken };