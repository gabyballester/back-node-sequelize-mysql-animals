import { Router } from "express";
import {
  register,
  login,
  activateAccount,
  forgotPassChangeEmail,
  forgotPassChangeRequest,
  refreshAccessToken,
} from "../controllers/auth.controller";

const router = Router();
// agrega -> /auth
router.post("/register", register);
router.post("/login", login);
router.get("/activate/:hash", activateAccount);
router.post("/forgot-pass-change-email", forgotPassChangeEmail);
router.post("/forgot-pass-change-request", forgotPassChangeRequest);
router.post("/refresh-access-token", refreshAccessToken)

export default router;
