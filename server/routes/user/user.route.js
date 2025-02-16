import { Router } from "express";
import { getUserData } from "./user.controller.js";
import userAuth from "../../middlewares/userAuth.js";

const userRouter = Router();
userRouter.get("/data", userAuth, getUserData);

export default userRouter;
