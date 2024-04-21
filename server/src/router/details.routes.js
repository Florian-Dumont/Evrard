import { Router } from "express";

import {getDetailsByProductId,getDetailsById,updateDetails,addPic,getImagesBydetailsId} from "../../controller/details.js";

const router = Router();

router.get("/:id", getDetailsById);
router.get("/product/:id", getDetailsByProductId);
router.get ("/product/images/:detail_id", getImagesBydetailsId)


router.post("/addPic", addPic);
router.post("/update/:id",updateDetails);


export default router