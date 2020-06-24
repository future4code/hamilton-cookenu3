import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { Recipe } from "../Database/Recipe";
import { CookenuUser } from '../Database/CookenuUser';
import { Database } from "../Database/Database";
import { CookenuFollow } from "../Database/CookenuFollow";

export const getFeed = async (req: Request, res: Response): Promise<void> => {
    try{
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token)

        if(authenticationData.role !== "admin"){
            throw new Error("Não tem acesso.");
        }

        const recipe = new Recipe();
        const feed = await recipe.getFeed();

        res.status(200).send({
            recipes: feed
        })
    }catch(error){
        res.status(400).send({
            message: error.message
        })
    }
    
    await Database.destroyConnection();
}