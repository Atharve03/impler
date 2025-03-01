
import { useState } from "react";
import axios from "axios";
import { useCart } from "./cartContext";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice,emptyCart } = useCart
  ();
  const [user, setUser] = useState({ firstName: "", lastName: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    setMessage("");
    if (!user.firstName || !user.lastName || !user.address) {
      toast.warn("⚠️ Please fill all required fields!",)
      return;
    }

    const orderData = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      items: cart.map((item) => ({
        productId: item.id, 
        name: item.name,
        quantity: item.quantity,
      })),
      totalAmount: totalPrice,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/order/place-order",
        orderData
      );

      if (response.data.success) {
        setMessage("✅ Order placed successfully!");
        toast.success("Order placed successfully!")
        setTimeout(() => {
            navigate("/");
            emptyCart()
          }, 2000);
      } else {
        toast.error("❌ Failed to place order. Try again!");
      }
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("❌ Failed to place order. Try again!",);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cart Items */}
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border p-4 rounded">
                <div>
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-gray-600">${item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-gray-300 px-2 py-1 rounded mr-2"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="bg-gray-300 px-2 py-1 rounded ml-2"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="ml-4 text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <h2 className="text-xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</h2>
          </div>

          {/* Order Form */}
          <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-lg font-bold mb-4">User Details</h2>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="border p-2 w-full mb-2"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="border p-2 w-full mb-2"
              onChange={handleInputChange}
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              className="border p-2 w-full mb-2"
              onChange={handleInputChange}
              required
            ></textarea>
            <button
              onClick={handleOrder}
              disabled={loading}
              className={`bg-green-500 text-white px-4 py-2 rounded w-full ${loading ? "opacity-50" : ""}`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
            {message && <p className="mt-2 text-center text-sm">{message}</p>}
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
