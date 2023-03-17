import * as UserController from "../controllers/users";
import express from "express";

const router = express();

router.get("/", UserController.getAuthUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;
