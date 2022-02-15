import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_OAUTH2_CLIENT_ID);

export const verifyGoogleIdTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorizationHeader = request.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];

  if (token == null)
    return response.status(401).json({
      message: "No access token",
    });

  try {
    await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_OAUTH2_CLIENT_ID,
    });
    next();
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      // @ts-ignore
      message: error.message,
    });
  }
};
