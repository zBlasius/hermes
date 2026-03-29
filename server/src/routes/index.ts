import { Router } from "express";
import { UserController } from "../modules/account/application";
import { login } from "./account/LoginRouter";
import { signup } from "./account/SignUpRouter";
import { verifyCurrentToken } from "./account/VerifyTokenRouter";
const router = Router()

router.post("/login", login);
router.post("/signup", signup); 
router.post("/verify_token", verifyCurrentToken)
export default router;