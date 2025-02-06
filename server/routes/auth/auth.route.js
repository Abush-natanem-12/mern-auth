import express from "express";
import {
  login,
  logout,
  register,
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

export default authRouter;
