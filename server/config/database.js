import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const isRender = process.env.PGHOST?.includes('render.com');

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: isRender ? { rejectUnauthorized: false } : false
};

export const pool = new pg.Pool(config);