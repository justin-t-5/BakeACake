import { pool } from './database.js';

const createTable = async () => {
      console.log("PGUSER:", process.env.PGUSER);
  console.log("PGPASSWORD:", process.env.PGPASSWORD);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cakes (
      id SERIAL PRIMARY KEY,
      flavor TEXT NOT NULL,
      frosting TEXT NOT NULL,
      toppings TEXT[],
      size TEXT NOT NULL,
      price NUMERIC NOT NULL,
      image TEXT,
      createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("Cake Table Baked!");
};

createTable();