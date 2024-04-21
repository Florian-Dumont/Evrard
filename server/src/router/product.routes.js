import { Router } from "express";
import { getCategories,getAvgProduct,getProductByCategories,getByValues,getAllProduct,addProduct,addPic, /* getLastProductID, */getProductById , getSizesByProductLabel, getColorBySize} from "../../controller/product.js";


const router  = Router();


router.get("/allproduct", getAllProduct);
router.get("/categories", getCategories);
router.get("/average", getAvgProduct);
// router.get("/last-product-id", getLastProductID);
router.get("/:id", getProductById);
router.get("/product/:label_1", getByValues);
router.get("/sizes/:label_1", getSizesByProductLabel);
router.get("/colors/:label_1/:size", getColorBySize);
router.get("/:label/:id", getProductByCategories);


router.post("/add", addProduct);
router.post("/addPic", addPic);



export default router;