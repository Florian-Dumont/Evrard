import { Router } from "express";
import { getCategories,getAvgProduct,getProductByCategories,getByValues,getAllProduct,addProduct,addPic, /* getLastProductID, */getProductById } from "../../controller/product.js";


const router  = Router();


router.get("/allproduct", getAllProduct);
router.get("/categories", getCategories);
router.get("/average", getAvgProduct);
// router.get("/last-product-id", getLastProductID);
router.get("/:id", getProductById);
router.get("/:label/:id", getProductByCategories);
router.get("/:label", getByValues);

router.post("/add", addProduct);
router.post("/addPic", addPic);



export default router;