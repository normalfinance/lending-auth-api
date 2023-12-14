import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";
import { ThirdwebAuth } from "@thirdweb-dev/auth/express";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

const api = express();
const router = Router();

const corsOptions = {
  credentials: true,
  origin: process.env.CORS_ORIGIN,
};

api.use(cors(corsOptions));
router.use(cors(corsOptions));

const { authRouter, authMiddleware, getUser } = ThirdwebAuth({
  domain: process.env.THIRDWEB_AUTH_DOMAIN || "",
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
});

router.get("/hello", (req, res) => res.send("Hello World!"));

// Add the auth router to our app to set up the /auth/* endpoints
router.use("/auth", authRouter);

// Add the auth middleware to the rest of our app to allow user authentication on other endpoints
router.use(authMiddleware);

api.use("/api/", router);
export const handler = serverless(api);
