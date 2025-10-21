import React from 'react'
import {useState} from 'react';
import {createCake} from '../services/CakeAPI.jsx';
import {useNavigate} from 'react-router-dom';
import '../App.css'

const CreateCake = () => {

    const [form, setForm]= useState({
        flavor:'',
        frosting:'',
        toppings:'',
        size:'',
        price:'',
        image:''
    });
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

const handleSubmit = async e => {
  e.preventDefault();

  const payload = {
    ...form,
    frosting: [form.frosting],
    toppings: [form.toppings]
  };

  await createCake(payload);
  navigate('/cakes');
};

    return (
        <div>
        <form onSubmit ={handleSubmit}>
        <h2>Create a Cake</h2>
        {['flavor','frosting', 'toppings', 'size','price','image'].map(field => (
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
        <button type="submit">Bake It</button>
        </form>

        </div>
    )
}

export default CreateCake