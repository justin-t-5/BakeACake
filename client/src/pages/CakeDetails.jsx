import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCake } from '../services/CakeAPI';

const CakeDetails = () => {
  const { id } = useParams();
  const [cake, setCake] = useState(null);

  useEffect(() => {
    getCake(id).then(res => setCake(res.data));
  }, [id]);

  if (!cake) return <p>Loading...</p>;

  return (
    <div>
      <h2>{cake.flavor} Cake</h2>
      <p><strong>Frosting:</strong> {cake.frosting}</p>
      <p><strong>Toppings:</strong> {cake.toppings}</p>
      <p><strong>Size:</strong> {cake.size}</p>
      <p><strong>Price:</strong> ${cake.price}</p>
      {cake.image && <img src={cake.image} alt="Cake preview" width="200" />}
    </div>
  );
};

export default CakeDetails;