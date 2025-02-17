import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

interface TableData {
  id?: number;
  value: string;
}

class CacheOperations {
  private db: SQLite.SQLiteDatabase | null;
  private tableName: string;

  constructor(tableName: string) {
    this.db = null;
    this.tableName = tableName;
  }
  
  setDB(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  private getColumnsString(columns?: string[]): string {
    return columns ? columns.join(", ") : "*";
  }

  private throwError(error: Error) {
    console.error(error);
    throw new Error(error.message);
  }

  async createRow(data: TableData): Promise<void> {
    if(!this.db) return this.throwError(new Error("DB not initialized"));

    const query = `INSERT INTO ${this.tableName} (value) VALUES (?);`;
    await this.db.runAsync(query, [data.value]);
  }

  async getByFilter(filter: {
    columns?: string[];
    whereQuery?: string;
  }): Promise<TableData[] | void> {

    if(!this.db) return this.throwError(new Error("DB not initialized"));
    const columnsString = this.getColumnsString(filter.columns);
    let query = `SELECT ${columnsString} FROM ${this.tableName}`;
    
    if (filter.whereQuery) {
      query += ` WHERE ${filter.whereQuery}`;
    }

    query += ";";
    const result = await this.db.getAllAsync(query);
    return result as TableData[];
  }

  async updateTable(data: TableData): Promise<void> {
    if(!this.db) return this.throwError(new Error("DB not initialized"));

    if (!data.id) throw new Error("ID é necessário para atualizar");
    
    const query = `UPDATE ${this.tableName} SET value = ? WHERE id = ?;`;
    await this.db.runAsync(query, [data.value, data.id]);
  }

  async deleteRow(id: number): Promise<void> {
    if(!this.db) return this.throwError(new Error("DB not initialized"));

    const query = `DELETE FROM ${this.tableName} WHERE id = ?;`;
    await this.db.runAsync(query, [id]);
  }
}

export default CacheOperations;