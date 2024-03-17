import { Router } from "express";
import { getColorByProductId , getColorById,updateColor } from "../../controller/color.js";


const router = Router();

router.get("/product/:product_id", getColorByProductId)
router.get("/:id", getColorById);

router.post("/update/:id", updateColor);

export default router;