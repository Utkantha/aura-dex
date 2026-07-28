import express from "express";
import { OAuth2Client } from 'google-auth-library';
import { verifyGoogleToken } from "../middlewares/auth.middleware";
import { getCurrentUserData } from "../controllers/user.controller";

///get the current users details using google Oauth token 

const userRouter = express.Router();

userRouter.get("/me", verifyGoogleToken, getCurrentUserData)

export default userRouter