import { useEffect, useState } from "react";
import { getAllProducts } from "../helper/product.helper";
import ProductCard from "./productCard";


const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          alert("Products not found!");
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (product) => {
    console.log("Added to cart:", product);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
