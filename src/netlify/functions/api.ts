import express, { Router } from "express";
import serverless from "serverless-http";
import { ThirdwebAuth } from "@thirdweb-dev/auth/express";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

const app = express();

const { authRouter, authMiddleware, getUser } = ThirdwebAuth({
  domain: process.env.THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
});

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

// Add the auth router to our app to set up the /auth/* endpoints
app.use("/auth", authRouter);

// Add the auth middleware to the rest of our app to allow user authentication on other endpoints
app.use(authMiddleware);

export const handler = serverless(app);
