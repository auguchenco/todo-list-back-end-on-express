import { defaultResponseGenerator, successfulResponseGenerator, errorResponseGenerator } from "../config/generators/response.generator.js";
import { getUserByUsername, createUser } from "../models/user.model.js";
import { tokenGenerator } from "../config/generators/token.generator.js";

import bcrypt from 'bcrypt';

export const registerCtrl = async (req, res) => {
  const defaultResponse = defaultResponseGenerator(res, 'user', 'register', 'registered');

  const { username, password } = req.body;
  try {
    let user = await getUserByUsername(username);

    if (user?.id) {
      return errorResponseGenerator({
        status: 400,
        error: 'Username already taken',
        ...defaultResponse
      });
    };

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Crypto Hashed Password
    user = await createUser(username, hashedPassword);

    successfulResponseGenerator({
      status: 201,
      data: user,
      ...defaultResponse
    });

  } catch (error) {
    errorResponseGenerator({
      status: 500,
      error: error,
      ...defaultResponse
    });
  };
};

export const loginCtrl = async (req, res) => {
  const defaultResponse = defaultResponseGenerator(res, 'user', 'log-in', 'logged');

  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    
    if (!user?.id) {
      return errorResponseGenerator({
        status: 404,
        error: 'User not found',
        ...defaultResponse
      });
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponseGenerator({
        status: 401,
        error: 'Invalid password',
        ...defaultResponse
      });
    };

    const token = tokenGenerator(user.id, user.username);
    successfulResponseGenerator({
      status: 201,
      data: token,
      ...defaultResponse
    });

  } catch (error) {
    errorResponseGenerator({
      status: 500,
      error: error,
      ...defaultResponse
    });
  };
};
