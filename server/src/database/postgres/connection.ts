import { inject, injectable } from "inversify";
import { Pool } from "pg";
import 'dotenv/config';

export interface IDatabase {
  connect(): Promise<void>;
  getClient(): Pool;
}

@injectable()
export class PostgresConnection implements IDatabase {
  private pool: Pool;

  constructor() {
    // print all process.env variables
    console.log("Environment Variables:", process.env);
    this.pool = new Pool({
      host: process.env.POSTGRES_HOST || "localhost",
      port: parseInt(process.env.POSTGRES_PORT || "5431", 10),
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "password",
      database: process.env.POSTGRES_DB_NAME,
    });
  }

  async connect(): Promise<void> {
    try {
      await this.pool.connect();
      console.log("✅ Connected to PostgreSQL");
    } catch (err) {
      console.error("❌ PostgreSQL connection error:", err);
      throw err;
    }
  }

  getClient(): Pool {
    return this.pool;
  }
}
