import {pool} from '../config/database.js';

export const getCakes = async (req,res) => {
    const result = await pool.query('SELECT * FROM cakes ORDER by id ASC');
    res.json(result.rows);
}

export const createCake = async (req,res) => {
    const {flavor, frosting, toppings, size, price, image} = req.body;
    const result = await pool.query(`
        INSERT INTO cakes (flavor, frosting, toppings, size, price, image)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
         [flavor, [frosting], [toppings], size, price, image]);
        res.status(201).json(result.rows[0]);
}

export const updateCake = async (req,res) => {
    const id = parseInt(req.params.id)
    const {flavor, frosting, toppings, size, price, image} = req.body;
    const result = await pool.query(`
        UPDATE cakes SET flavor=$1,frosting=$2,toppings=$3,size=$4,price=$5,image=$6 WHERE id=$7`,
         [flavor, [frosting], [toppings], size, price, image,id]);
        res.status(200).json(result.rows[0])
}

export const deleteCake = async (req,res) => {
    const id = parseInt(req.params.id)
    const result = await pool.query(`
        DELETE FROM cakes WHERE id =$1 RETURNING *`, [id])
    res.status(200).json(result.rows[0])
}

export const getCakeById = async (req,res) => {
    const id = parseInt(req.params.id);
    const result = await pool.query('SELECT * FROM cakes WHERE id =$1',[id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cake not found' });
    }
    res.status(200).json(result.rows[0]);
}