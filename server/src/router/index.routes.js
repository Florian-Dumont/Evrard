import { Router } from "express";
import home_routes from "./admin.routes.js";
import product_routes from "./product.routes.js";
import user_routes from"./user_routes.js";


const router = Router();

router.get("/", home_routes)

router.use("/api/v1/product", product_routes )
router.use("/api/v1/user", user_routes)

router.get("*", (req,res) =>{
    res.status(404).json({msg:"404 not found"})
})

export default router;