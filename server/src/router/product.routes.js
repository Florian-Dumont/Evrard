import { Router } from "express";
import { getCategories,getAvgProduct,getProductByCategories,getByValues,getAllProduct,addProduct,addPic, /* getLastProductID, */getProductById , getSizesByProductId, getColorBySize} from "../../controller/product.js";


const router  = Router();


router.get("/allproduct", getAllProduct);
router.get("/categories", getCategories);
router.get("/average", getAvgProduct);
// router.get("/last-product-id", getLastProductID);
router.get("/:id", getProductById);
router.get("/product/:label_1", getByValues);
router.get("/sizes/:product_id", getSizesByProductId);
router.get("/colors/:product_id/:size", getColorBySize);
router.get("/:label/:id", getProductByCategories);


router.post("/add", addProduct);
router.post("/addPic", addPic);



export default router;