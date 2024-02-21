import { NextFunction } from "express";
import ApiError from "../utils/ApiError";
import dotenv from "dotenv";

dotenv.config();

export default function ErrorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errStatus = err.statusCode || 500;
  const errMsg =
    process.env.NODE_ENV === "DEVELOPMENT"
      ? err.message
      : "Something went wrong";
  console.log("inside error handler");

  //@ts-ignore
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "DEVELOPMENT" ? err.stack : {},
  });
}