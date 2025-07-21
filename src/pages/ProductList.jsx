import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const { add } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(setProducts);

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(['all', ...data]));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'all' || product.category === category)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-1/2"
          placeholder="Search products..."
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-1/3"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option value={cat} key={i}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map(p => (
          <div key={p.id} className="rounded-xl overflow-hidden border shadow-sm bg-white hover:shadow-md transition">
            <img src={p.image} alt={p.title} className="h-48 w-full object-contain p-4 bg-gray-50" />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">{p.title}</h3>
              <p className="text-indigo-600 font-bold text-lg">${p.price}</p>
              <button
                onClick={() => add(p)}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
              >
                Add to Cart
              </button>
              <Link to={`/product/${p.id}`} className="block text-center mt-1 text-indigo-500 hover:underline">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;