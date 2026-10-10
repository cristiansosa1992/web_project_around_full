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
    if (!req.user) {
      res.status(401).json({
        message: "Usuario no autorizado",
      });
      return;
    }

    const userId = req.user._id;
    const cards = await Card.find({ owner: userId }).sort({ createdAt: -1 });

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
    if (!req.user) {
      res.status(401).json({
        message: "Usuario no autorizado",
      });
      return;
    }

    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }

    if (String(card.owner) !== req.user._id) {
      throw Object.assign(
        new Error("No tienes permiso para eliminar esta tarjeta"),
        {
          statusCode: 403,
        },
      );
    }

    await Card.findByIdAndDelete(id);

    res.json(addIsLiked(card, req.user._id));
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
    if (!req.user) {
      res.status(401).json({
        message: "Usuario no autorizado",
      });
      return;
    }

    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }

    if (String(card.owner) !== req.user._id) {
      throw Object.assign(
        new Error("No tienes permiso para modificar esta tarjeta"),
        {
          statusCode: 403,
        },
      );
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!updatedCard) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }

    res.json(addIsLiked(updatedCard, req.user._id));
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
    if (!req.user) {
      res.status(401).json({
        message: "Usuario no autorizado",
      });
      return;
    }

    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }

    if (String(card.owner) !== req.user._id) {
      throw Object.assign(
        new Error("No tienes permiso para modificar esta tarjeta"),
        {
          statusCode: 403,
        },
      );
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!updatedCard) {
      throw Object.assign(new Error("ID de tarjeta no encontrado"), {
        statusCode: 404,
      });
    }

    res.json(addIsLiked(updatedCard, req.user._id));
  } catch (err) {
    next(err);
  }
};