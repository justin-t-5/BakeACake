import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCake, updateCake } from '../services/CakeAPI';

const EditCake = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCake(id).then(res => setForm(res.data));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await updateCake(id, form);
    navigate(`/cakes/${id}`);
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Cake</h2>
      {['flavor', 'frosting', 'toppings', 'size', 'price', 'image'].map(field => (
        <div key={field}>
          <label>{field}</label>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            required={field !== 'image'}
          />
        </div>
      ))}
      <button type="submit">Update Cake</button>
    </form>
  );
};

export default EditCake;