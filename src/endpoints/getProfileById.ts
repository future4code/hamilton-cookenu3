import { Request, Response } from "express";
import { CookenuUser } from "../Database/CookenuUser";
import { Authenticator } from "../services/Authenticator";

export const getProfileById = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;

        const id = req.params.id;

        const authenticator = new Authenticator();
        authenticator.getData(token)
        
        const cookenuUser = new CookenuUser();
        const user = await cookenuUser.getUserById(id)

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email
        })
        console.log("getProfileById deu bom.");
    }catch(error){
        res.status(400).send({
            message: error.message
        })
    }
}