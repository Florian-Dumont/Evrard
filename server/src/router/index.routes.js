import { Router } from "express";
import home_routes from "./admin.routes.js";
import product_routes from "./product.routes.js";
import user_routes from"./user.routes.js";
import color_routes from "./color.routes.js";
import details_routes from "./details.routes.js";
import categories_routes from "./categories.routes.js"


const router = Router();

router.get("/", home_routes)

router.use("/api/v1/product", product_routes )
router.use("/api/v1/user", user_routes)
router.use("/api/v1/color", color_routes)
router.use("/api/v1/details", details_routes)
router.use("/api/v1/categories", categories_routes)


// router.get("*", (req,res) =>{
//     res.status(404).json({msg:"404 not found"})
// })

export default router;