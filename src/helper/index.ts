import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export const generateAccessToken = (userId: string, email: string): string => {
  return jwt.sign(
    {userId, email},
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: `${process.env.JWT_SECRET_EXPIRATION}`,
    }
  )
}