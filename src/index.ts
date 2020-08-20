import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { getUserProfile } from "./endpoints/getUserProfile";
import { createRecipe } from "./endpoints/createRecipe";
import { getRecipe } from "./endpoints/getRecipe";
import { unfollowUser } from "./endpoints/unfollowUser";
import { followUser } from "./endpoints/followUser";
import { getFeed } from "./endpoints/getFeed";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/user/signup", signup);
app.post("/user/login", login);
app.get("/user/profile", getUserProfile);
app.post("/recipe", createRecipe);
app.get("/recipe/:id", getRecipe);
app.post("/user/follow", followUser);
app.post("/user/unfollow", unfollowUser);
app.get("/user/feed", getFeed);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
