import { Router } from "express";
import { UserController } from "../modules/account/application";
import { login } from "./account/LoginRouter";
import { signup } from "./account/SignUpRouter";
const router = Router()

router.post("/login", login);
router.post("/signup", signup); 

export default router;