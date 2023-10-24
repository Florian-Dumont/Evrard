import { Router } from "express";
import { getCategories,getAvgProduct,getProductByCategories,getByValues,getAllProduct,addProduct } from "../../controller/product.js";

const router  = Router();

router.get("/categories", getCategories);
router.get("/average",getAvgProduct);
router.get("/allproduct",getAllProduct);
router.get("/:label/:id",getProductByCategories);
router.get("/:label",getByValues);

router.post("/add",addProduct)


export default router;