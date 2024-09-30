import { Request, Response } from "express";

const enableCors =
  (fn: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return await fn(req, res);
  };

const handler = async (req: Request, res: Response): Promise<void> => {
  const currentDate = new Date();
  res.end(currentDate.toString());
};

module.exports = enableCors(handler);
