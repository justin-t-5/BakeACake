import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllCakes, getCake, updateCake, deleteCake } from '../services/CakeAPI';
import { Link } from 'react-router-dom';

const EditCake = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    flavor: '',
    frosting: [],
    toppings: [],
    size: '',
    price: '',
    image: ''
  });

  const [error, setError] = useState(null); // ✅ Error state for validation

  useEffect(() => {
    const fetchCake = async () => {
      const res = await getCake(id);
      const cake = res.data;
      setForm({
        ...cake,
        frosting: cake.frosting || [],
        toppings: cake.toppings || []
      });
    };
    fetchCake();
  }, [id]);

  const handleDelete = async id => {
    await deleteCake(id);
    navigate('/cakes');
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = e => {
    const { name, options } = e.target;
    const selected = Array.from(options)
      .filter(o => o.selected)
      .map(o => o.value);
    setForm(prev => ({ ...prev, [name]: selected }));
  };

  useEffect(() => {
    const priceMap = {
      flavor: { vanilla: 5, chocolate: 6, 'red velvet': 7 },
      frosting: { vanilla: 2, chocolate: 3, strawberry: 2.5 },
      toppings: { sprinkles: 1, fruit: 2, nuts: 1.5 },
      size: { small: 10, medium: 15, large: 20 }
    };

    let total = 0;
    total += priceMap.flavor[form.flavor] || 0;
    total += priceMap.size[form.size] || 0;

    if (Array.isArray(form.frosting)) {
      form.frosting.forEach(f => total += priceMap.frosting[f] || 0);
    }

    if (Array.isArray(form.toppings)) {
      form.toppings.forEach(t => total += priceMap.toppings[t] || 0);
    }

    setForm(prev => ({ ...prev, price: total }));
  }, [form.flavor, form.size, form.frosting, form.toppings]);

  // ✅ Validation logic
  const isInvalidCombo = () => {
    if (form.flavor === 'red velvet' && form.frosting.includes('strawberry')) {
      return 'Red velvet cannot have strawberry frosting.';
    }
    if (form.size === 'small' && form.toppings.includes('nuts')) {
      return 'Small cakes cannot have nuts as a topping.';
    }
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationError = isInvalidCombo();
    if (validationError) {
      setError(validationError);
      return;
    }

    await updateCake(id, form);
    navigate('/cakes');
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Cake</h2>

      {/* ✅ Show validation error */}
      {error && <p style={{ color: 'black' }}>{error}</p>}

      <label>Flavor</label>
      <select name="flavor" value={form.flavor} onChange={handleChange} required>
        <option value="">Select flavor</option>
        <option value="vanilla">Vanilla</option>
        <option value="chocolate">Chocolate</option>
        <option value="red velvet">Red Velvet</option>
      </select>

      <label>Frosting</label>
      <select name="frosting" multiple value={form.frosting} onChange={handleMultiSelect} required>
        <option value="vanilla">Vanilla</option>
        <option value="chocolate">Chocolate</option>
        <option value="strawberry">Strawberry</option>
      </select>

      <label>Toppings</label>
      <select name="toppings" multiple value={form.toppings} onChange={handleMultiSelect} required>
        <option value="sprinkles">Sprinkles</option>
        <option value="fruit">Fruit</option>
        <option value="nuts">Nuts</option>
      </select>

      <label>Size</label>
      <select name="size" value={form.size} onChange={handleChange} required>
        <option value="">Select size</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>

      <label>Image URL</label>
      <input name="image" value={form.image} onChange={handleChange} />

      <label>Price</label>
      <input name="price" value={form.price} readOnly />

      <button type="submit">Update Cake</button>
      <button type="button" onClick={() => handleDelete(id)}>Delete</button>
    </form>
  );
};

export default EditCake;