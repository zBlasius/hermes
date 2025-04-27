import { Router } from "express";
import { UserController } from "../modules/account/application";
import { login } from "./account/LoginRouter";
const router = Router()

router.post("/login", login);

export default router;