import bcrypt from 'bcryptjs';
const salt_rounds = parseInt(process.env.SALT_ROUNDS);

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt_rounds);
}

export const isPasswordValid = (password, hash) => {
  return bcrypt.compare(password, hash);
}