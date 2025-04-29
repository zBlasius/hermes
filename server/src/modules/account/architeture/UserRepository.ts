import { injectable, inject } from "inversify";
import { IUserRepository, User } from "./contracts/IUserRepository";
import { SignUpData } from "../domain/contracts/IUserService";
import { Pool, PoolConnection, QueryError } from "mysql2";
import { InternalServerError } from "../../../shared/errors/AppError";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject("database") private connection: Pool) {}

  private async getConnection(): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
      this.connection.getConnection((err, connection) => {
        if (err) {
          reject(new InternalServerError('Failed to get database connection'));
        }
        resolve(connection);
      });
    });
  }

  private async query<T>(connection: PoolConnection, sql: string, params?: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (error: QueryError | null, result: any, fields: any) => {
        if (error) {
          reject(new InternalServerError('Database query failed'));
        }
        resolve(result as T);
      });
    });
  }

  async create(data: SignUpData): Promise<User> {
    const connection = await this.getConnection();
    try {
      const sql = `
        INSERT INTO users (name, email, password, created_at)
        VALUES (?, ?, ?, NOW())
      `;
      const params = [data.name, data.email, data.password];

      const result = await this.query<any>(connection, sql, params);
      
      return {
        id: result.insertId,
        name: data.name,
        email: data.email,
        password: data.password,
        created_at: new Date()
      };
    } finally {
      connection.release();
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const connection = await this.getConnection();
    try {
      const sql = `
        SELECT id, name, email, password, created_at
        FROM users
        WHERE email = ?
      `;
      const params = [email];

      const results = await this.query<User[]>(connection, sql, params);
      return results[0] || null;
    } finally {
      connection.release();
    }
  }

  async findById(id: number): Promise<User | null> {
    const connection = await this.getConnection();
    try {
      const sql = `
        SELECT id, name, email, password, created_at
        FROM users
        WHERE id = ?
      `;
      const params = [id];

      const results = await this.query<User[]>(connection, sql, params);
      return results[0] || null;
    } finally {
      connection.release();
    }
  }
}
