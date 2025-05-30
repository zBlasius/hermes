import { injectable, inject } from "inversify";
import { IUserRepository, User, SignUpData } from "./contracts/IUserRepository";
import { Pool } from "pg";
import { InternalServerError } from "../../../shared/errors/AppError"; //TODO - should be here by dependency injection

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject("database") private connection: Pool) {}

  async create(data: SignUpData): Promise<User> {
    try {
      const sql = `
        INSERT INTO users (name, email, password, type, created_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING *
      `;
      const params = [data.name, data.email, data.password, data.type];

      const result = await this.connection.query(sql, params);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerError('Database query failed');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const sql = `
        SELECT id, name, email, password, type, created_at
        FROM users
        WHERE email = $1
      `;
      const params = [email];

      const result = await this.connection.query(sql, params);
      return result.rows[0] || null;
    } catch (error) {
      throw new InternalServerError('Database query failed');
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const sql = `
        SELECT id, name, email, password, type, created_at
        FROM users
        WHERE id = $1
      `;
      const params = [id];

      const result = await this.connection.query(sql, params);
      return result.rows[0] || null;
    } catch (error) {
      throw new InternalServerError('Database query failed');
    }
  }
}
