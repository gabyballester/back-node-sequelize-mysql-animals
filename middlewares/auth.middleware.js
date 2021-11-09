import { decodeTokenService, hasTokenExpiredService } from '../api/services/jwt.service';

export const isAuthMd = (req, res, next) => {
    let message;
    let token;
    let payload;

    // comprobar si tiene cabecera de autenticación
    if (!req.headers.authorization) {
        message = 'La petición no tiene la cabecera de autenticación';
        return res.status(401).send({ message });
    } else { // limpio token y quito el Bearer
        token = req.headers.authorization.replace("Bearer ", "").replace(/['"]+/g, "");
    }

    try {
        // Decodifico el payload
        payload = decodeTokenService(token)

        // comprobar validez
        if (hasTokenExpiredService(payload)) {
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