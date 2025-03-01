import axios from "axios";

export async function getAllProducts(){
    try {
        const response = await axios.get("http://localhost:5000/api/v1/product/getallproducts")
        if (!response.data) {
            console.log(response);
            return {
                success:false,
                message:"failed to fatch the products"
            }

        }
        return {
            success:response.data.success,
            message:response.data?.message,
            data:response.data?.products
        }
    } catch (error) {
        if (!response.data) {
            return {
                success:false,
                message:"failed to fatch the products"
            }

        }
    }
}