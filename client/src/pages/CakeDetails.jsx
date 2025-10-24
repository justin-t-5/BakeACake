import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCake,getAllCakes, deleteCake } from '../services/CakeAPI';
import { Link } from 'react-router-dom';
import './CakeDetails.css';

const CakeDetails = () => {
  const { id } = useParams();
  const [cake, setCake] = useState(null);
  const navigate = useNavigate();


  const handleDelete = async id => {
      await deleteCake(id);
      navigate('/cakes');
    };
  useEffect(() => {
    getCake(id).then(res => setCake(res.data));
  }, [id]);

  if (!cake) return <p>Loading...</p>;

  return (
    <>
    <div className="details">
      <h2>{cake.flavor} Cake</h2>
      <p><strong>Frosting:</strong> {cake.frosting}</p>
      <p><strong>Toppings:</strong> {cake.toppings}</p>
      <p><strong>Size:</strong> {cake.size}</p>
      <p><strong>Price:</strong> ${cake.price}</p>
      {cake.image && <img src={cake.image} alt="Cake preview" width="200" />}
    <div>
           <Link to={`/cakes/${cake.id}/edit`}>Edit</Link>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>

    </div>
     </>
  );
};

export default CakeDetails;