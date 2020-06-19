import { Database } from "./Database";

export class CookenuFollow extends Database {
    private static TABLE_NAME: string = "CookenuFollow";

    public async followUser(
        user_id: string,
        follower_id: string
    ): Promise<void> {
        await this.getConnection()
            .insert({
                user_id: user_id,
                follower_id: follower_id,
            })
            .into(CookenuFollow.TABLE_NAME);
        console.log("usario seguido com sucesso!!!");
    }
    public async unfollowUser(
        user_id: string,
        follower_id: string
    ): Promise<void> {
        await this.getConnection()
            .delete()
            .from(CookenuFollow.TABLE_NAME)
            .where({ user_id: user_id })
            .and.where({ follower_id: follower_id });
        console.log("Unfoolow deu Bom!!!");
    }

    public async getAllCookenuFollow(): Promise<any>{
        const result = await this.getConnection()
            .select("*")
            .from(CookenuFollow.TABLE_NAME)

            return result[0];
    }
}
