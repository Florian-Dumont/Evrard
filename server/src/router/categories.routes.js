import { Router } from "express";
import { addCategories,deleteCategories } from "../../controller/categories.js";


const router  = Router();

router.post("/add", addCategories);


router.delete("/delete/:id", deleteCategories)


// router.delete("/delete_product/:id", deleteProduct);



export default router;