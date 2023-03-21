import * as UserController from "../controllers/users";
import express from "express";
import { requiresAuth } from "../middleware/auth";

const router = express();

//has requries Auth middleware to authenticate before grabbing user
router.get("/", requiresAuth, UserController.getAuthUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;
