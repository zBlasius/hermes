import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import CacheOperations from "../crud/Cache";

class UserService extends CacheOperations {
    
    constructor(){
        super("User");
        this.init();
    }

    async init(){
        const db = await this.getDBConnection();
        super.setDB(db);
        this.createTable(db);
        return db;
    }

    async createTable(db: SQLiteDatabase) {
        const query = `CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            name TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            dirty BOOLEAN DEFAULT 0
        );`;
    
        await db.runAsync(query);
    }

    async getDBConnection() {
        return SQLite.openDatabaseAsync("hermes-data.db");
    }
}

export default UserService;