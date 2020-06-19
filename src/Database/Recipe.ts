import knex from "knex";
import { Database } from "./Database";

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

}