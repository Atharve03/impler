import express from "express";
import { getAllProducts } from "../controller/product.controller.js"; // Ensure the ".js" extension



const router = express.Router();


router.route("/getallproducts").get(getAllProducts);

export default router;