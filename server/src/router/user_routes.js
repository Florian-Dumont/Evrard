import { Router } from "express";
import {createAccount,signin, check_token,adminLog} from "../../controller/user.js"
import { auth } from "../../middlewares/auth.js";


const router = Router();

router.get("/check_token", auth,check_token)


router.post("/signin", signin)
router.post("/signup", createAccount)
router.post("/adminlog", adminLog)

export default router;