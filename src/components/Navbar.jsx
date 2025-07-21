import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center font-sans">
      <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
        🛒 <span>E-Shop</span>
      </Link>
      <div className="flex items-center gap-6 text-gray-800 font-medium">
        <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
        <Link to="/cart" className="relative hover:text-indigo-600 transition">
          🛍 Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;