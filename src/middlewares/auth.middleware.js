import jwt from 'jsonwebtoken';
import { defaultResponseGenerator, errorResponseGenerator } from '../config/generators/response.generator.js';

import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

const tokenAuth = (req, res, next) => {
  const defaultResponse = defaultResponseGenerator(res, 'token', 'verify', 'verified');

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return errorResponseGenerator({
      status: 403,
      error: 'Token not provided',
      ...defaultResponse
    });
  };

  try {
    const tokenPayloadDecoded = jwt.verify(token, JWT_SECRET);
    req.user = tokenPayloadDecoded; // Set the payload from the token on the req.user atribute object from the request.
    next();

  } catch (error) {
    errorResponseGenerator({
      status: 401,
      error: error,
      ...defaultResponse
    });
  };
};

export default tokenAuth;