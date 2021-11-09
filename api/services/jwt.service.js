import jwt from 'jsonwebtoken';
import moment from 'moment';
import { GLOBAL } from "../../constants";
const { secretKey, accessTokenExp, refreshTokenExp } = GLOBAL;

export const createAccessTokenService = (user) => {
    const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        active: user.active
    };
    return jwt.sign(payload, secretKey, { expiresIn: accessTokenExp })
}

export const createRefreshTokenService = (user) => {
    const payload = {
        sub: user.id,
    };
    return jwt.sign(payload, secretKey, { expiresIn: refreshTokenExp })
}

export const decodeTokenService = (token) => {
    return jwt.verify(token, secretKey)
}

export const hasTokenExpiredService = (payload) => {
    const expirationDate = payload.exp;
    const currentDate = moment().unix();
    return expirationDate <= currentDate;
}

export const refreshAccessTokenService = () => {
    console.log('Generando refreshToken');
}