import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../cartpage/cartContext";
// Ensure correct path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart(); // Get cart items

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Impler</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/cart" className="hover:underline">
            Cart ({cart.length})
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-blue-700 mt-2 space-y-2 p-3">
          <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/cart" className="hover:underline" onClick={() => setIsOpen(false)}>
            Cart ({cart.length})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
