import * as brcrypt from "bcryptjs";

export class HashManager {
    public async hash(s: string): Promise<string>{
        const rounds = Number(process.env.BCRYPT_COST);
        const salt = await brcrypt.genSalt(rounds);
        const result = await brcrypt.hash(s, salt);
        return result
    }

    public async compare(s: string, hash: string): Promise<boolean> {
        return brcrypt.compare(s, hash);
    }
}