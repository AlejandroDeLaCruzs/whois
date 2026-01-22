import { Db, MongoClient } from "mongodb";

let db: Db;
let client: MongoClient;
const dbName = "whois";

export const connectMongoDB = async(): Promise<void> => {
    try {
        const url = process.env.MONGO_URL as string;
        client = new MongoClient(url);
        await client.connect();
        db = client.db(dbName);
        console.log('conectado a la base de datos'+ dbName);

    } catch (error) {
        console.log('No se ha podido conectar a la BBDD');
    }
}

export const getDb = (): Db => db;