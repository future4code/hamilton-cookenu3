import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { Recipe } from "../Database/Recipe";

export const createRecipe = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;
        const recipeDate = {
            title: req.body.title,
            description: req.body.description
        }        

        if(!recipeDate.title || recipeDate.title.length < 3){
            throw new Error("Preencha o título com pelo menos 3 caracteres.");
        }

        if(!recipeDate.description){
            throw new Error("Preencha a descrição.");
        }

        const idGenerator = new IdGenerator();
        const recipe_id = idGenerator.generate();

        const authenticator = new Authenticator();
        const userData = authenticator.getData(token)

        const recipe = new Recipe();
        await recipe.createRecipe(
            recipe_id,
            recipeDate.title,
            recipeDate.description,
            new Date(),
            userData.id
        )

        res.status(200).send({
            message: "Receita criada com sucesso"
        })
    }catch(error){
        res.status(400).send({
            message: error.message
        })
    }
}