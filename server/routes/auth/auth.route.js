import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetOtp,
  resetPassword,
  sendOtpCode,
  verifyOtp,
} from "./auth.controller.js";
import userAuth from "../../middlewares/userAuth.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendOtpCode);
authRouter.post("/verify-account", userAuth, verifyOtp);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", resetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
