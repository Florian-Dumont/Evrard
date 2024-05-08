import { Router } from "express";
import { getCategorieById, addCategories, updateCategorie , deleteCategories } from "../../controller/categories.js";


const router  = Router();

router.post("/add", addCategories);
router.post("/update/:id", updateCategorie);

router.get("/:id", getCategorieById);

router.delete("/delete/:id", deleteCategories)


// router.delete("/delete_product/:id", deleteProduct);



export default router;