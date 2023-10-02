import { Router } from "express";
import home_routes from "./admin.routes.js";
import product_routes from "./product.routes.js";

const router = Router();

router.get("/", home_routes)

router.use("/api/v1/product", product_routes )

export default router;