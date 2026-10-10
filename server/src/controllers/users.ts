import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import User from "../models/user.js";

const SALT_ROUNDS = 10;

type MongoDuplicateError = Error & { code?: number };

const isDuplicateKeyError = (err: unknown): err is MongoDuplicateError =>
  err instanceof Error && (err as MongoDuplicateError).code === 11000;

// Obtiene la clave secreta para firmar el token JWT.
const getJwtSecret = (): string => {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    throw Object.assign(new Error("JWT_SECRET no está definido"), {
      statusCode: 500,
    });
  }

  return JWT_SECRET;
};

// Devuelve los datos del usuario dueño de la cuenta.
// Incluye email porque solo el propio usuario debe ver su correo.
const getPublicUser = (user: {
  _id: unknown;
  email: string;
  name: string;
  about: string;
  avatar: string;
}) => ({
  _id: user._id,
  email: user.email,
  name: user.name,
  about: user.about,
  avatar: user.avatar,
});

// Devuelve los datos visibles de otros usuarios.
// No incluye email ni password.
const getUserForOthers = (user: {
  _id: unknown;
  name: string;
  about: string;
  avatar: string;
}) => ({
  _id: user._id,
  name: user.name,
  about: user.about,
  avatar: user.avatar,
});

// Devuelve la lista de usuarios sin mostrar correos ni contraseñas.
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  void req;

  try {
    const users = await User.find({});

    res.json(users.map(getUserForOthers));
  } catch (err) {
    next(err);
  }
};

// Devuelve un usuario por id sin mostrar correo ni contraseña.
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

    res.json(getUserForOthers(user));
  } catch (err) {
    next(err);
  }
};

// Devuelve el perfil del usuario autenticado.
// Incluye email porque es el dueño de la cuenta.
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

    res.json(getPublicUser(user));
  } catch (err) {
    next(err);
  }
};

// Actualiza el nombre y la descripción del usuario autenticado.
// Devuelve solo los campos públicos del dueño, incluyendo email.
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

    res.json(getPublicUser(user));
  } catch (err) {
    next(err);
  }
};

// Actualiza el avatar del usuario autenticado.
// Devuelve solo los campos públicos del dueño, incluyendo email.
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

    res.json(getPublicUser(user));
  } catch (err) {
    next(err);
  }
};

// Crea un usuario nuevo.
// Guarda la contraseña hasheada y devuelve solo los datos públicos del dueño.
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, about, avatar, email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    res.status(201).json(getPublicUser(user));
  } catch (err) {
    if (isDuplicateKeyError(err)) {
      res.status(409).json({
        message: "El correo ya está registrado",
      });
      return;
    }

    next(err);
  }
};

// Inicia sesión.
// Compara la contraseña, genera un token y devuelve los datos públicos del dueño.
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
      return;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        message: "Email o contraseña incorrectos",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Email o contraseña incorrectos",
      });
      return;
    }

    const token = jwt.sign({ _id: user._id }, getJwtSecret(), {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: getPublicUser(user),
    });
  } catch (err) {
    next(err);
  }
};