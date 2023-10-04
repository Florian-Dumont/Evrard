import { Router } from "express";
import { getCategories,getAvgProduct,getProductByCategories,getByValues } from "../../controller/product.js";

const router  = Router();

router.get("/categories", getCategories);
router.get("/average",getAvgProduct);
router.get("/:label/:id",getProductByCategories);
router.get("/:label",getByValues);

export default router;