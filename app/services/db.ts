import * as SQLite from 'expo-sqlite';
import { Color } from '../models/item';
import { SQLiteDatabase } from 'expo-sqlite';

const db = SQLite.openDatabaseSync('colors.db');

async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let { user_version: currentDbVersion } = await db.getFirstAsync<any>(
        'PRAGMA user_version'
    );
    if (currentDbVersion >= DATABASE_VERSION) {
        return;
    }
    if (currentDbVersion === 0) {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS colors (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL);
            INSERT INTO colors (value) VALUES ('Green');
            INSERT INTO colors (value) VALUES ('Smarahd');
            INSERT INTO colors (value) VALUES ('Pink Gold');`);
        currentDbVersion = 1;
    }
    // if (currentDbVersion === 1) {
    //   Add more migrations
    // }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

async function addColor(value: string) {
    await db.runAsync(`INSERT INTO colors (value) VALUES (?);`, [value]);
}

async function deleteColor(id: number) {
    await db.runAsync(`DELETE FROM colors where id = ?;`, [id]);
}

async function updateColor(id: number, value: string) {
    await db.runAsync(`UPDATE colors set value = ? where id = ?;`, [id, value]);
}

async function getColors() {
    return await db.getAllAsync<Color>('SELECT * FROM colors');
}

export { migrateDbIfNeeded, addColor, deleteColor, getColors, updateColor }