import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { Recipe } from "../Database/Recipe";
import { CookenuUser } from '../Database/CookenuUser';
import { Database } from "../Database/Database";
import { CookenuFollow } from "../Database/CookenuFollow";

export const recipeFeed = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string        
        const authenticator = new Authenticator()
        const userData = authenticator.getData(token)        
        const recipe = new Recipe()
        const feed = await recipe.getFeed(userData.id)        
        
        res.status(200).send({
            recipes: feed
        })    
    
    }catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}