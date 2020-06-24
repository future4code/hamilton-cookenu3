import { Request, Response } from "express";
import { Recipe } from "../Database/Recipe";
import { Authenticator } from "../services/Authenticator";
import moment from "moment";

export const getRecipeById = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;
        const id = req.params.id;

        const authenticator = new Authenticator();
        authenticator.getData(token)

        const recipes = new Recipe();
        const recipe = await recipes.getRecipeById(id);

        const formattedDate = moment(recipe.creation_date).format("DD/MM/YYYY");

        res.status(200).send({
            id: id,
            title: recipe.title,
            description: recipe.description,
            createdAt: formattedDate
        })
        console.log("getRecipeById deu bom.");
    }catch(error){
        res.status(400).send({
            message: error.message
        })
    }
}