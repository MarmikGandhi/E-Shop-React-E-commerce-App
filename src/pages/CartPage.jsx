import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, remove, increaseQty, decreaseQty } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto mt-8 border">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/" className="text-indigo-500 underline">Go shopping</Link></p>
      ) : (
        <>
          <ul className="divide-y divide-gray-100">
            {cart.map(item => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-slate-700">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <button onClick={() => decreaseQty(item.id)} className="px-2 py-1 bg-gray-100 rounded">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)} className="px-2 py-1 bg-gray-100 rounded">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-800 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button className="text-red-500 text-sm hover:underline" onClick={() => remove(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right mt-6">
            <p className="text-xl font-bold text-slate-800">Total: ${total}</p>
            <Link to="/checkout" className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;