import React, { useState, useEffect } from 'react';
import { createCake } from '../services/CakeAPI.jsx';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './CreateCake.css';

const CreateCake = () => {
  const [form, setForm] = useState({
    flavor: '',
    frosting: [],
    toppings: [],
    size: '',
    price: '',
    image: ''
  });

  const [error, setError] = useState(null); // ✅ Error state
  const navigate = useNavigate();

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

    const payload = {
      ...form,
      frosting: form.frosting,
      toppings: form.toppings
    };

    await createCake(payload);
    navigate('/cakes');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create a Cake</h2>
        <div>
          <label>Flavor</label>
          <select name="flavor" value={form.flavor} onChange={handleChange} required>
            <option value="">Select flavor</option>
            <option value="vanilla">Vanilla</option>
            <option value="chocolate">Chocolate</option>
            <option value="red velvet">Red Velvet</option>
          </select>
        </div>

        <div>
          <label>Frosting</label>
          <select name="frosting" multiple onChange={handleMultiSelect} required>
            <option value="vanilla">Vanilla</option>
            <option value="chocolate">Chocolate</option>
            <option value="strawberry">Strawberry</option>
          </select>
        </div>

        <div>
          <label>Toppings</label>
          <select name="toppings" multiple onChange={handleMultiSelect} required>
            <option value="sprinkles">Sprinkles</option>
            <option value="fruit">Fruit</option>
            <option value="nuts">Nuts</option>
          </select>
        </div>

        <div>
          <label>Size</label>
          <select name="size" value={form.size} onChange={handleChange} required>
            <option value="">Select size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div>
          <label>Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/cake.jpg"
          />
        </div>

        <div>
          <h1>Price</h1>
          <input name="price" value={form.price} readOnly />
        </div>
      {error && <p className="error">{error}</p>}
        <button type="submit">Bake It</button>
          
      </form>
    </div>
  );
};

export default CreateCake;