import User from "../../models/user/User.js"
import { generateAuthToken } from "../../providers/jwt.js";
import _ from 'lodash';
import { createError } from "../../utils/handleErrors.js";
import { comparePasswords, generateUserPassword } from "../../helpers/bcrypt/bcrypt.js";

const registerUser = async (newUser) => {
  try {
    let user = new User(newUser);
    user.password = generateUserPassword(user.password);
    user = await user.save();
    return _.pick(user, ['_id', 'email', 'name']);
  } catch (error) {
    return createError('Mongoose', error);
  }
}

const getUser = async (userId) => {
  try {
    let user = await User.findById(userId);
    return user;
  } catch (error) {
    return createError('Mongoose', error);
  }
}

const getUsers = async () => {
  try {
    let users = await User.find();
    return users;
  } catch (error) {
    return createError('Mongoose', error);
  }
};

const login = async (email, password) => {
  try {
    let user = await User.findOne({ email });

    if (!user || !comparePasswords(password, user.password)) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      return createError('Authentication', error);
    }

    return generateAuthToken(user);

  } catch (error) {
    return createError('Mongoose', error);
  }
}

export { registerUser, getUser, getUsers, login };