import { expressjwt, GetVerificationKey } from "express-jwt";

export const checkJwt = expressjwt({
  secret: `${process.env.JWT_SECRET}`,
  algorithms: ['RS256'],
})
