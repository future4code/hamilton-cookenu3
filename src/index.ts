import express            from "express";
import dotenv             from "dotenv";
import { AddressInfo }    from "net";
import { signUp }         from "./endpoints/signUp";
import { login }          from "./endpoints/login";
import { getProfile }     from "./endpoints/getProfile";
import { getProfileById } from "./endpoints/getProfileById";
import { createRecipe }   from "./endpoints/createRecipe";
import { getRecipeById }  from "./endpoints/getRecipeById";
import { followUser }     from "./endpoints/followUser";
import { unfollowUser }   from "./endpoints/unfollowUser";
import { recipeFeed }     from "./endpoints/recipeFeed";

dotenv.config();

const app = express();
app.use(express.json());

app.post('/signup', signUp);
app.post('/login', login);
app.get('/user/profile', getProfile);
app.get('/user/:id', getProfileById);
app.post('/recipe', createRecipe);
app.get('/recipe/:id', getRecipeById);
app.post('/user/follow', followUser);
app.post('/user/unfollow', unfollowUser);
app.get('/user/feed', recipeFeed);

const server = app.listen(process.env.PORT || 3000, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server rodando na porta http://localhost:${address.port}`);
    }else{
        console.error("Falha ao conectar no server.");
    }
});