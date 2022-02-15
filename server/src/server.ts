import express, { Response } from "express";
import cors from "cors";

import { verifyGoogleIdTokenMiddleware } from "./middlewares/verify-google-id-token";

const app = express();

app.use(cors());

app.get("/", verifyGoogleIdTokenMiddleware, (_, response: Response) => {
  return response.json({
    mesage: "Success",
  });
});

app.listen(8000, () => {
  console.log("Server is running on PORT 8000");
});
