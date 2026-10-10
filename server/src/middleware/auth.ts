import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

type JwtPayload = {
  _id: string;
};

const getJwtSecret = (): string => {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    throw Object.assign(new Error("JWT_SECRET no está definido"), {
      statusCode: 500,
    });
  }

  return JWT_SECRET;
};

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Autorización requerida" });
    return;
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, getJwtSecret()) as JwtPayload;

    req.user = {
      _id: payload._id,
    };

    next();
  } catch {
    res.status(401).json({ message: "Autorización requerida" });
  }
};
