import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [paid, setPaid] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ items: 0, total: '0.00' });

  const totalItemsLive = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmountLive = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handlePayment = () => {
    setOrderDetails({ items: totalItemsLive, total: totalAmountLive });
    setPaid(true);
    clearCart();
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center bg-white shadow rounded mt-8">
      {!paid ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Review Your Order</h1>
          {cart.length === 0 ? (
            <p>Your cart is empty. <Link to="/" className="text-indigo-500 underline">Go back</Link></p>
          ) : (
            <>
              <ul className="text-left mb-4">
                {cart.map(item => (
                  <li key={item.id} className="py-1 flex justify-between border-b">
                    <span>{item.title} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="font-medium mb-1">Total Items: {totalItemsLive}</p>
              <p className="text-lg font-bold mb-4">Total: ${totalAmountLive}</p>
              <button
                onClick={handlePayment}
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
              >
                Pay Now
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Confirmed!</h1>
          <p className="mb-2">Thank you for your purchase.</p>
          <p>You ordered <strong>{orderDetails.items}</strong> item(s) for <strong>${orderDetails.total}</strong>.</p>
          <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Continue Shopping
          </Link>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;