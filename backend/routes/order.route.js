import express from "express";
import { body } from "express-validator";
import { placeOrder } from "../controller/order.controller.js";

const router = express.Router();

// ✅ Validation rules for placing an order
const validateOrder = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2 })
        .withMessage("First name must be at least 2 characters long"),
    
    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2 })
        .withMessage("Last name must be at least 2 characters long"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required")
        .isLength({ min: 5 })
        .withMessage("Address must be at least 5 characters long"),

    body("items")
        .isArray({ min: 1 })
        .withMessage("Items array must contain at least one item"),
    
    body("items.*.productId")
        .isInt({ gt: 0 })
        .withMessage("Product ID must be a positive integer"),

    body("items.*.name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required"),

    body("items.*.quantity")
        .isInt({ gt: 0 })
        .withMessage("Quantity must be a positive integer"),
];


router.post("/place-order", validateOrder, placeOrder);

export default router;
