import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(setProd);
  }, [id]);

  if (!prod) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <img src={prod.image} alt={prod.title} className="h-64 mx-auto" />
      <h1 className="text-2xl font-bold">{prod.title}</h1>
      <p className="text-gray-600">${prod.price}</p>
      <p>{prod.description}</p>
    </div>
  );
};

export default ProductDetails;
