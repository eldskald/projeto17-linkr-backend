import pg from 'pg';
import { config } from 'dotenv';

config();

const { Pool } = pg;

const user = 'postgres';
const password = 'postgres';
const host = 'localhost';
const port = 5432;
const database = 'linkr';

const connection = new Pool({
  user,
  password,
  host,
  port,
  database
});

export default connection;
