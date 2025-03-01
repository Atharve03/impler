import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { CartProvider } from "./cartpage/cartContext";
import CartPage from "./cartpage/cartPage";
import Navbar from "./component/navbar";
import ProductListing from "./productView/productListing";
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
    </CartProvider>
  );
}

export default App;
