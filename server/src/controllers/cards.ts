import type { NextFunction, Request, Response } from "express";
import Card from "../models/card.js";

type CardObject = Record<string, unknown> & {
  likes?: unknown[];
};

const addIsLiked = (
  card: { toObject: () => CardObject },
  userId?: string,
) => {
  const cardObject = card.toObject();
  const likes = Array.isArray(cardObject.likes) ? cardObject.likes : [];

  return {
    ...cardObject,
    isLiked: likes.some((id) => String(id) === userId),
  };
};

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const cards = await Card.find({});
    const userId = req.user?._id;

    const cardsWithIsLiked = cards.map((card) => addIsLiked(card, userId));

    res.json(cardsWithIsLiked);
  } catch (err) {
    next(err);
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, link } = req.body;

    if (!req.user) {
      res.status(401).json({
        message: "Usuario no autorizado",
      });
      return;
    }

    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });

    res.status(201).json(addIsLiked(card, req.user._id));
  } catch (err) {
    next(err);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }

    res.json(addIsLiked(card, req.user?._id));
  } catch (err) {
    next(err);
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user?._id } },
      { new: true },
    );

    if (!card) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }

    res.json(addIsLiked(card, req.user?._id));
  } catch (err) {
    next(err);
  }
};

export const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user?._id } },
      { new: true },
    );

    if (!card) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }

    res.json(addIsLiked(card, req.user?._id));
  } catch (err) {
    next(err);
  }
};