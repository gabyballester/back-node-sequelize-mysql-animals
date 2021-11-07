import { decodeToken, hasTokenExpired } from '../api/services/jwt.service';
const secretKey = process.env.SECRET_KEY;

export const isAuthMd = (req, res, next) => {
    let message;
    let token;
    let payload;

    // comprobar si tiene cabecera de autenticación
    if (!req.headers.authorization) {
        message = 'La petición no tiene la cabecera de autenticación';
        return res.status(401).send({ message });
    } else {
        //extraigo token
        token = req.headers.authorization;
    }

    try {
        // Decodifico el payload
        payload = decodeToken(token, secretKey)

        // comprobar validez
        if (hasTokenExpired(payload)) {
            message = 'El token ha expirado';
            return res.status(401).send({ message });
        } else {    //Agregamos payload al objeto user
            req.user = payload;
        }

        next(); // continuar proceso fuera del middleware

    } catch (error) {
        message = 'El token no es válido'
        return res.status(401).send({ message });
    }
}