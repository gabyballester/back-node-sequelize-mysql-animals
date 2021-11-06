import { GLOBAL } from "../../../constants";
const { api, emailConfig } = GLOBAL;
const { baseUrl, endpoint } = api;
import { transporter } from "./nodemailer";

const emailDeliveryManager = async ({ subject, html }, email) => {
  try {
    return await transporter.sendMail({
      from: emailConfig.auth.user,
      to: email,
      subject,
      html
    })
  } catch (error) {
    return error
  }
}

export const sendActivationEmail = async (user) => {
  const { username, email, hash } = user;
  const url = baseUrl + endpoint.emailActivation + hash;

  const template = {
    subject: 'Activación de cuenta Red Social',
    html: `
    <h3>Bienvenido ${username}!!</h3>
    <p>Te has registrado correctamente, para activar tu cuenta
    <a href=${url}>haz click aquí</a>`
  }
  return await emailDeliveryManager(template, email);
}

export const sendForgotPassChangeEmail = async (user) => {
  const { username, email, hash } = user;
  const url = baseUrl + endpoint.frontPassChangeForm + hash;

  const template = {
    subject: 'Password olvidado',
    html: `
      <h3>Hola ${username}!!</h3>
      <p>Para cambiar la contraseña asociada a tu usuario y correo <b>${email}</b>,
      te proporcionamos un enlace.
      <a href="${url}">Haz click aquí</a></p>
      <p>Si no has sido tu, ignora este mensaje</p>    
      `
  }
  return await emailDeliveryManager(template, email);
}
