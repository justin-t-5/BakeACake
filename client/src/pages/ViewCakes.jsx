import React from 'react'
import { useEffect, useState } from 'react';
import { getAllCakes, deleteCake } from '../services/CakeAPI';
import { Link } from 'react-router-dom';
import './ViewCakes.css';

const ViewCakes = () => {
  const [cakes, setCakes] = useState([]);

  const fetchCakes = () => {
    getAllCakes().then(res => setCakes(res.data));
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  const handleDelete = async id => {
    await deleteCake(id);
    fetchCakes();
  };

  return (
    <div>
      <h2 className="subhead">All Cakes</h2>
      <ul className="list">
        {cakes.map(cake => (
          <li key={cake.id}>
            <div>
            <div>
            <Link className="title"to={`/cakes/${cake.id}`}>{cake.flavor}</Link>
            <p>Frosting: {cake.frosting}</p>
            <p>Topping: {cake.toppings}</p>
            <p>Size: {cake.size}</p>
            <p>Price: {cake.price}</p>
            </div>
            <div>
            <Link to={`/cakes/${cake.id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(cake.id)}>Delete</button>
            </div>
            </div>
            <img src={cake.image}></img>
   
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCakes;