import crypto from "crypto";

export const generateHash = () => {
  return crypto.randomBytes(20).toString("hex");
};
