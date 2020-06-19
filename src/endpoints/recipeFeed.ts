import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { Recipe } from "../Database/Recipe";
import { CookenuUser } from '../Database/CookenuUser';
import { Database } from "../Database/Database";
import { CookenuFollow } from "../Database/CookenuFollow";

export const recipeFeed = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator();
        const userData = authenticator.getData(token);

        if(userData.role !== "correto"){
            throw new Error("Não pode acessar.")
        }

        const ckFollow = new CookenuFollow();
        const teste_Id = await ckFollow.getAllCookenuFollow()
        
        const recipeBase = new Recipe();
        const feed = await recipeBase.getAllRecipes(teste_Id)

        res.status(200).send({
            message: feed
        })
    }catch(error){
        res.status(400).send({
            message: error.message
        })
    }
}