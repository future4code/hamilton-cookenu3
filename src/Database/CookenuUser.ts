import knex from "knex";
import { Database } from "./Database";

export class CookenuUser extends Database {

    private static TABLE_NAME: string = "CookenuUser"

    public async getTableContent(table_name: string): Promise<any>{
        const result = await this.getConnection()(`${table_name}`)
        .select("*")

        return result;
    }

    public async createUser(
        id: string,
        email: string,
        name: string,
        password: string,
        role: string
    ): Promise<void>{
        await this.getConnection()
            .insert({
                id,
                email,
                name,
                password,
                role
            })
            .into(CookenuUser.TABLE_NAME)

        console.log("Cadastro concluído com sucesso!");
    }

    public async getUserByEmail(email: string): Promise<any>{
        const result = await this.getConnection()
            .select("*")
            .from(CookenuUser.TABLE_NAME)
            .where({ email })

            return result[0];
    }

    public async getUserById(id: string): Promise<any>{
        const result = await this.getConnection()
            .select("*")
            .from(CookenuUser.TABLE_NAME)
            .where({ id })

            return result[0];
    }
}