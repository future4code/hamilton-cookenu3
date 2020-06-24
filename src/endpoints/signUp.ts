import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { CookenuUser } from "../Database/CookenuUser";

export const signUp = async (req: Request, res: Response) => {
    try{
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const role = req.body.role;

        if (!email || email.indexOf("@") === -1) {
            throw new Error("E-mail inválido.");
        }
        
        if(!password || password.length < 6){
            throw new Error("A senha deve ter 6 caracteres ou mais.");
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password);

        const cookenuUser = new CookenuUser()
        await cookenuUser.createUser(
            id,
            email,
            name,
            hashPassword,
            role
        )

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({
            id,
            role: role
        })

        res.status(200).send({token});
        
    }catch(error){
        res.status(400).send({
            message: error.message
        })
    }
}