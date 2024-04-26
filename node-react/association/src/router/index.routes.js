import { Router } from "express";
import { home } from "../controller/view.js";
import story_routes from "./story.routes.js";
import category_route from "./category.routes.js";
import admin_routes from "./admin.routes.js";

const router = Router();

// views
router.get("/", home);


// routes (API style)
router.use("/story", story_routes);

router.use("/category", category_route);


router.use("/admin", admin_routes);

export default router;
