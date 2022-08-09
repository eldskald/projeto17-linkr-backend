import pg from 'pg';
import { config } from 'dotenv';

config();

const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

const connection = new Pool(databaseConfig);

export default connection;
