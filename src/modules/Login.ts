import Token from "../auth/Token";
import bcrypt from "bcrypt";

import prisma from "@database/Prisma";

import IUsuario from "../interfaces/User_Interface";

import { Request, Response } from "express";

async function Login(req: Request, res: Response) {
  const senha = req.body.senha;

  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error("Sistema não configurado");
  }

  const token = new Token(process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);

  const user = await GetEncryptedPassword(req.body.email, req.body.schema);

  if (user && user.senha) {
    if (await bcrypt.compare(senha, user.senha)) {
      delete user.senha;

      return res.json(token.create(user));
    }
  }

  return false;
}

async function GetEncryptedPassword(
  email: string,
  schema: string
): Promise<IUsuario | undefined> {
  const response = await prisma.usuario.findFirst({
    where: {
      email: email,
    },
  });

  if (!response) {
    return undefined;
  }

  return response;
}

export default Login;
