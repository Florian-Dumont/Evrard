import { Router } from "express";
import { getCategories,getAvgProduct,getProductByCategories } from "../../controller/product.js";

const router  = Router();

router.get("/categories", getCategories);
router.get("/average",getAvgProduct);
router.get("/listing",getProductByCategories);

export default router;