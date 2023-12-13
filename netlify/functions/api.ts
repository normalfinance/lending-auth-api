import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";
import { ThirdwebAuth } from "@thirdweb-dev/auth/express";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

const api = express();
const router = Router();

api.use(cors());
router.use(cors());

const { authRouter, authMiddleware, getUser } = ThirdwebAuth({
  domain: "localhost:3006",
  wallet: new PrivateKeyWallet(
    "12632ee39b5e32052f9b5d453d8b5f456da6dbc96c90a47e75a0ac7e1fcb8e88"
  ),
});

router.get("/hello", (req, res) => res.send("Hello World!"));

// Add the auth router to our app to set up the /auth/* endpoints
router.use("/auth", authRouter);

// Add the auth middleware to the rest of our app to allow user authentication on other endpoints
router.use(authMiddleware);

api.use("/api/", router);
export const handler = serverless(api);
