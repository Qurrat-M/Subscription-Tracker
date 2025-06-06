import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";

const authRouter = Router();

//Path : /api/v1/auth/sign-up
authRouter.post("/sign-up", signUp);

//Path : /api/v1/auth/sign-in
authRouter.post("/sign-in", signIn);

//Path : /api/v1/auth/sign-out
authRouter.post("/sign-out", (req, res) => {
  res.send({ title: "Sign Out" });
});

export default authRouter;
