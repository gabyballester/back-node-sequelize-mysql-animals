import nodemailer from 'nodemailer';
import { GLOBAL } from "../../../constants/index";
const { service, secure, auth } = GLOBAL.emailConfig;

export const transporter = nodemailer.createTransport({ service, secure, auth });