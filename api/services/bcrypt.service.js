import jwt from 'jsonwebtoken';
import moment from 'moment';
const secretKey = process.env.SECRET_KEY;

export const encodeToken = (user) => {
    const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        active: user.active
    };
    return jwt.sign(payload, secretKey, { expiresIn: '2w' })
}

export const decodeToken = (token) => {
    return jwt.verify(token, secretKey)
}

export const hasTokenExpired = (payload) => {
  return payload.exp <= moment().unix();
}
