import { Router } from "express";
import { getSizeByProductId , getSizeById,updateSize } from "../../controller/size.js";



const router  = Router();


router.get("/product/:product_id", getSizeByProductId );
router.get("/:id", getSizeById );

router.post("/update/:id", updateSize)


export default router