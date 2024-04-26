import { Router } from "express";
import { home, signup , login} from "../controller/app.js";
import admin_route from "./admin.route.js";


const router = Router()



//route app views
router.get("/", home);
//page de connexion
router.get("/signin", signup);
router.post("/signin/log", login)






//route back offices
router.use("/admin", admin_route)

export default router;
