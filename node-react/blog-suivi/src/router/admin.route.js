import { Router } from "express";
import { home, story , addStory, user, deleteUser} from  "../controller/admin/index.js"  

const router = Router();

router.get("/", home); // /admin

router.get("/story", story)// /admin/story
router.post("/story/add",addStory)// /admin/story/add ( a lenvoi du formulaire d'ajout de story)


router.get("/user",user)

router.delete("/user/delete/:id", deleteUser)





export default router;