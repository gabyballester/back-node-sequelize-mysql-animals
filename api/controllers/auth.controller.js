import { User } from '../../database/models';
import { hashPassword, isPasswordValid } from "../services/bcrypt.service";
import { generateHash } from "../services/hash.service";
import { encodeToken } from '../services/jwt.service';
import { sendActivationEmail, sendForgotPassChangeEmail } from "../services/email/email.service";
import { getOneByEmailService, getOneByHashService, getOneByUsernameService, updateOneService, updateOneByEmailService } from '../services/entity.service';
const entity = 'User'

export const register = async (req, res) => {
    const user = req.body;
    const { username, email, password } = user;
    let message;
    //validación
    if (!username, !email, !password) {
        message = 'Faltan datos en el formulario';
        return res.status(404).json({ message });
    }

    try {
        // si usuario existe
        const doesUserExist = await getOneByUsernameService(entity, username);
        if (doesUserExist) {
            message = 'nombre de usuario en uso, elige otro o loguéate'
            return res.status(404).json({ message });
        }

        //Comprobación de email duplicado
        const doesEmailExist = await getOneByEmailService(entity, email);

        if (doesEmailExist) {
            message = 'El email ya existe, loguéate o solicita contraseña olvidada';
            return res.status(404).json({ message });
        }

        // si todo es correcto, hashea el password
        user.password = hashPassword(password);
        user.hash = generateHash();
        //luego crea el usuario
        const newUser = await User.create(user);
        if (newUser) {
            newUser.password = undefined;
            sendActivationEmail(user);
            newUser.hash = undefined;
            return res.status(200).json({ message: 'Usuario creado, ve al correo para activarlo!!', newUser });
        }

        return res.status(404).json({ message: 'Usuario no creado :(' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }
}

export const login = async (req, res) => {
    const { email, password, getToken } = req.body;
    let message;

    // validación
    if (!email, !password) {
        message = 'Faltan datos en el formulario'
        return res.status(404).json({ message });
    }

    try {
        //compruebo si existe en db
        const userObj = await getOneByEmailService(entity, email);
        if (!userObj) {
            message = 'El usuario no existe';
            return res.status(404).json({ message });
        }

        // comprobar validez password
        const match = isPasswordValid(password, userObj.password);
        if (!match) {
            message = 'Password incorrecto!!';
            return res.status(404).json({ message });
        }

        // comprobar si usuario activado
        if (!userObj.active) {
            message = 'Usuario inactivo, contacta con el administrador!!';
            return res.status(404).json({ message });
        }

        // si es correcto, compruebo si solicita el token y lo devuelvo
        if (getToken) {
            return res.status(200).json({
                token: encodeToken(userObj)
            })
        }

        //Si coincide pero no pide token, devolvemos usuario sin password ni hash
        userObj.password = undefined;
        userObj.hash = undefined;
        message = 'Password correcto';
        return res.status(200).json({ userObj, message })

    } catch (error) {
        return res.status(500).json({ error })
    }
}

export const activateAccount = async (req, res) => {
    const { hash } = req.params;
    let message;

    try {
        // busca el hash si existe extrae el id de usuario
        const hashExists = await getOneByHashService(entity, hash);
        if (!hashExists) {
            message = 'Hash no encontrado, contacta con el administrador';
            return res.status(404).json({ message })
        }
        const { id } = hashExists;
        const dataToUpdate = { active: true, hash: null };
        const updatedCount = await updateOneService(dataToUpdate, entity, id)

        // si correcto
        if (updatedCount && updatedCount.length > 0) {
            message = 'Usuario activado con éxito!!';
            return res.status(200).json({ message, updatedCount });
        }

        //si no lo actualiza
        return res.status(404).json({ message: 'Usuario no activado :(' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

export const forgotPassChangeEmail = async (req, res) => {
    const { email } = req.body;
    let message;

    try {

        // busco si existe email en DB
        const userExists = await getOneByEmailService(entity, email);
        if (!userExists) return res.status(404).json({ message: 'Email no encontrado' })

        //Si existe compruebo si está activado el usuario
        if (!userExists.active) {
            message = 'Usuario inactivo, contacta con el administrador!!'
            return res.status(404).json({ message });
        }

        // creo hash temporal en usuario
        userExists.hash = generateHash(userExists.email);

        // Actualizao user con nuevo hash
        const updatedCount = await updateOneByEmailService(userExists.dataValues, entity, email);

        // Si no pudo actualizar
        if (updatedCount && updatedCount[0] > 0) {
            await sendForgotPassChangeEmail(userExists);
            message = 'Email con hash enviado';
            return res.status(200).json({ message, updatedCount });
        }
        message = 'No ha sido posible recuperar tu contraseña, contacta con el administrador'
        return res.status(200).json({ message });

    } catch (error) {
        return res.status(500).json({ error })
    }
}

export const forgotPassChangeRequest = async (req, res) => {
    const { pass, repeatPass, hash } = req.body;
    const minLength = 6;
    const minLengthMessage = `El password ha de contener mínimo ${minLength} caracteres`;
    let message;

    try {

        // busco hash en DB
        const userExists = await getOneByHashService(entity, hash);
        if (!userExists) return res.status(404).json({ message: 'Hash no encontrado' })

        //Si no está activado, lo rechaza
        if (!userExists.dataValues.active) {
            message = 'Usuario inactivo, contacta con el administrador!!'
            return res.status(404).json({ message });
        }

        // comprobamos longitud de password       
        if (pass.length < 6) {
            return res.status(404).json({ message: minLengthMessage })
        }

        // compruebo longitud de repeat password
        if (repeatPass.length < 6) {
            return res.status(404).json({ message: minLengthMessage })
        }

        //comparo igualdad entre ellos
        if (repeatPass !== pass) {
            return res.status(404).json({ message: 'Los passwords no coindicen' })
        }

        // si todo es correcto, encriptamos pass, borro hash
        userExists.password = await hashPassword(pass);
        userExists.hash = null;

        // actualizo user
        const updatedCount = await updateOneByEmailService(userExists.dataValues, entity, userExists.email)

        // // si correcto
        if (updatedCount && updatedCount.length > 0) {
            message = 'Password actualizado!!';
            return res.status(200).json({ message, updatedCount });
        }

        //si no lo actualiza
        message = 'Cambio fallido, vuelve a intentarlo o contacta con el administrador'
        return res.status(400).json({ message })

    } catch (error) { //si falla servidor
        console.log(error);
        return res.status(500).json({ error })
    }
}


