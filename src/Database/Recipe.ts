import knex from "knex";
import { Database } from "./Database";
import { title } from "process";
import moment from "moment";

export class Recipe extends Database {
    
    private static TABLE_NAME: string = "Recipes"

    public async createRecipe(
        recipe_id: string,
        title: string,
        description: string,
        recipeDate: Date,
        creatorUserId: string
    ): Promise<void> {
        await this.getConnection()
            .insert({
                recipe_id,
                title,
                description,
                recipeDate,
                creatorUserId
            })
            .into(Recipe.TABLE_NAME)
        
        console.log("Receita cadastrada com sucesso!");
    }

    public async getRecipeById(recipe_id: string): Promise<any>{
        const result = await this.getConnection()
            .select("*")
            .from(Recipe.TABLE_NAME)
            .where({recipe_id})

            return result[0];
    }
    
    public async getAllRecipes(follower_id: string): Promise<any>{
        const result = await this.getConnection()
            .select("*")
            .from(Recipe.TABLE_NAME)
            .where({ follower_id })

            return result[0];
    }

    public async getFeed(
        user_id: string
    ): Promise<any>{
        const result = await this.getConnection().raw(`
            SELECT
            follower_id,
            name,
            recipe_id,
            title,
            description,
            recipeDate,
            FROM Recipes
            JOIN CookenuFollow ON user_id = follower_id
            JOIN CookenuUser ON follower_id = user_id
            WHERE user_id = "${user_id}"
            ORDER BY recipeDate DESC;
        `)
        const feed = []
        for(const item of result[0]){
            const formattedDate = moment(item.formattedDate).format("DD/MM/YYYY")
            feed.push({
                id: item.recipe_id,
                title: item.title,
                description: item.description,
                recipeDate: formattedDate,
                userId: item.follower_id,
                username: item.name
            })
        }
        return feed
    }

}