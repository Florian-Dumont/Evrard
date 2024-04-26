import { Router } from "express";
import { home, story, user } from "../controller/admin/index.js";
import { add } from "../controller/story.js";

const router = Router();
// http://localhost:9000/admin
router.get("/", home); // le home du back office
// http://localhost:9000/admin/story
router.get("/story", story);
router.post("/story/add", add);

router.get("/user", user);


export default router;