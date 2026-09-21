import type { NextFunction, Request, Response } from "express";
import User from "../models/user.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  void req;

  try {
    const users = await User.find({});

    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      throw Object.assign(new Error("ID de usuario no encontrado"), {
        statusCode: 404,
      });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      throw Object.assign(new Error("ID de usuario no encontrado"), {
        statusCode: 404,
      });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw Object.assign(new Error("ID de usuario no encontrado"), {
        statusCode: 404,
      });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateCurrentUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw Object.assign(new Error("ID de usuario no encontrado"), {
        statusCode: 404,
      });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({
      name,
      about,
      avatar,
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};