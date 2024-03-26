import { Router } from "express";

import {getDetailsByProductId,getDetailsById,updateDetails} from "../../controller/details.js";

const router = Router();

router.get("/product/:product_id", getDetailsByProductId);
router.get("/:id", getDetailsById);

router.post("/update/:id",updateDetails);

export default router