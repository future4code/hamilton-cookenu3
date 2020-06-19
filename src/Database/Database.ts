import knex from "knex";
import Knex from "knex";

export abstract class Database {
    private static connection: knex | null = null;

    protected getConnection(): Knex{
        if(Database.connection === null){
            Database.connection = knex({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE_NAME,
                }
            })
        }    
        return Database.connection;
    }

    public static async destroyConnection(){
        if(Database.connection !== null){
            await Database.connection.destroy()
            Database.connection = null
        }
    }
}