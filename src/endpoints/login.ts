import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { CookenuUser } from "../Database/CookenuUser";
import { HashManager } from "../services/HashManager";

export const login = async (req: Request, res: Response) => {
    try{
        const data = {
            email: req.body.email,
            password: req.body.password
        }

        if (!data.email || data.email.indexOf("@") === -1) {
            throw new Error("E-mail inválido.");
        }
        
        if(!data.password || data.password.length < 6){
            throw new Error("A senha deve ter 6 caracteres ou mais.");
        }

        const cookenuUser = new CookenuUser()
        const user = await cookenuUser.getUserByEmail(data.email);

        const hashManager = new HashManager()
        const compareResult = await hashManager.compare(
            data.password,
            user.password
        )

        if(!compareResult){
            throw new Error("Senha incorreta.");
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({
            id: user.id,
            role: user.role
        });

        res.status(200).send({ token });
        console.log("Login deu bom!");
    
    }catch(error){
        res.status(400).send({
            message: error.message
        })
    }
}