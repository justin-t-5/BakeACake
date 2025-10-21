import React from 'react'
import { useEffect, useState } from 'react';
import { getAllCakes, deleteCake } from '../services/CakeAPI';
import { Link } from 'react-router-dom';

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
      <h2>All Cakes</h2>
      <Link to="/cakes/new">Create New Cake</Link>
      <ul>
        {cakes.map(cake => (
          <li key={cake.id}>
            <Link to={`/cakes/${cake.id}`}>{cake.flavor}</Link>
            <button onClick={() => handleDelete(cake.id)}>Delete</button>
            <Link to={`/cakes/${cake.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCakes;