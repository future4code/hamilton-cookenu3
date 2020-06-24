import { Response, Request } from "express";
import { Authenticator } from "../services/Authenticator";
import { CookenuFollow } from "../Database/CookenuFollow";

export const unfollowUser = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;

        const unfollowUserID = req.body.unfollowUser;
        if(!unfollowUserID || unfollowUserID === ""){
            throw new Error("Informe o usuário.");
        }

        const authenticator = new Authenticator();
        const userData = authenticator.getData(token);

        const unfollowUser = new CookenuFollow();
        await unfollowUser.unfollowUser(
            userData.id,
            unfollowUserID
        )

        res.status(200).send({
            message: "unfollowUser endpoint sucesso."
        })
    }catch(error){
        res.status(400).send({
            message: error.message
        })
    }
}