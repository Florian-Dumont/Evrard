import { Router } from "express";
import { getProductCartByRef } from "../../controller/orders.js";


const router = Router();

router.get("/product/:reference", getProductCartByRef); 


export default router;