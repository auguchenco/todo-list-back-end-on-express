import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

export const tokenGenerator = (id, username) => {
  return jwt.sign(
    { id, username },
    JWT_SECRET,
    { expiresIn: '8h' }
  );
};