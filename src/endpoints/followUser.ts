import {Request, Response}from "express";
import { Authenticator}from "../services/Authenticator";
import {CookenuFollow}from "../Database/CookenuFollow";

export const followUser = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string

        const followUserID = req.body.followUser
        if(!followUserID || followUserID === ""){
            throw new Error("Informe o Usuario!")
        }
        const authenticator = new Authenticator()
        const userData = authenticator.getData (token)


        const followUser = new CookenuFollow()
        await followUser.followUser(
            userData.id,
            followUserID
        )

        res.status(200).send({
            message: "followUser endpoint sucesso."
        })
    }catch(error){
        res.status(400).send({
            message: error.message
        })
    }
}