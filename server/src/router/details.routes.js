import { Router } from "express";

import {getDetailsByProductId,getdetailsById,updateDetails} from "../../controller/details.js";

const router = Router();

router.get("/product/:product_id", getDetailsByProductId);
router.get("/id", getdetailsById);

router.post("/update/:id",updateDetails);

export default router