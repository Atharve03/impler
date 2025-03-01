import fs from "fs"; // Import fs to read JSON
import path from "path";
import { fileURLToPath } from "url";

// Fixes __dirname issue in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON data
const productData = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8"));

export const getAllProducts = (req, res) => {
    try {
        if (!productData || productData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found."
            });
        }
        return res.status(200).json({
            success: true,
            products: productData
        });       
    } catch (error) {
        console.error("Error in GetAllProducts function", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products."
        });
    }
};
