import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserProfile";
import { getUserById } from "./endpoints/getUserById";
import { createRecipe } from "./endpoints/createRecipe";
import { editRecipe2 } from "./endpoints/editRecipe2";
import { getRecipe } from "./endpoints/getRecipe";
import { unfollowUser } from "./endpoints/unfollowUser";
import { followUser } from "./endpoints/followUser";
import { getFeed } from "./endpoints/getFeed";
import { deleteRecipe } from "./endpoints/deleteRecipe";
import { deleteUser } from "./endpoints/deleteUser";
import { createRefreshToken } from "./endpoints/createRefreshToken";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/user/signup", signup);
app.post("/user/login", login);
app.get("/user/feed", getFeed);
app.get("/user/profile", getUserProfile);
app.get("/user/:id", getUserById);
app.post("/recipe", createRecipe);
app.get("/recipe/:id", getRecipe);
app.post("/user/follow", followUser);
app.post("/user/unfollow", unfollowUser);
app.put("/recipe/:id/edit", editRecipe2);
app.delete("/recipe/:id/delete", deleteRecipe);
app.delete("/user/:id/delete", deleteUser);
app.post("/user/refresh", createRefreshToken);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
