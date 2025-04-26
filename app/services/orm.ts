import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from '../../db/schema';

export function useORM() {
    const db = drizzle(useSQLiteContext(), { schema });

    const addColor = async (value: string) => {
        await db.insert(schema.colorsTable).values({ name: value });
    };
    const getColors = async () => {
        return await db.select().from(schema.colorsTable);
    }
    return { addColor, getColors };
}

