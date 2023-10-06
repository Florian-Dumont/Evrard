import { Router } from "express";
import {createAccount,signin, check_token} from "../../controller/user.js"
import { auth } from "../../middlewares/auth.js";


const router = Router();

router.get("/check_token", auth,check_token)

router.post("/signup", createAccount)
router.post("/signin", signin)

export default router;