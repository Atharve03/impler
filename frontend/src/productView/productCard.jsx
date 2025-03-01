import { useCart } from "../cartpage/cartContext";



const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="text-blue-600 font-semibold mt-2">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};



export default ProductCard;
