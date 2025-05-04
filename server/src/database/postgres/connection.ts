import { Pool } from 'pg';

export const connection = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'hermes',
  password: process.env.POSTGRES_PASSWORD || 'secret',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
}); 