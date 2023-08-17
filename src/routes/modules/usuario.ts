import Crud from "@modules/Crud";
import prisma from "@database/Prisma";

import bcrypt from "bcrypt";

import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi, Segments } from "celebrate";

const crud = new Crud();

const routes = Router();

// Create
routes.post(
  "/usuario",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      sobrenome: Joi.string().required(),
      documento: Joi.string().min(11).max(11).required(),
      email: Joi.string().required(),
      senha: Joi.string().required(),
      telefone: Joi.string().required(),
      endereco: Joi.string(),
      funcao: Joi.string().required(),
      account_role: Joi.string(),
      internal_role: Joi.string(),
      conta: Joi.object().required(),
    }),
  }),
  async (req, res) => {
    const saltRounds = 10;
    req.body.senha = await bcrypt.hash(req.body.senha, saltRounds);
    crud.create(req, res, prisma.usuario);
  }
);

// Read
routes.get(
  "/usuario",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
      nome: Joi.string(),
      sobrenome: Joi.string(),
      documento: Joi.string().min(11).max(11),
      email: Joi.string(),
      senha: Joi.string(),
      telefone: Joi.string(),
      endereco: Joi.string(),
      funcao: Joi.string(),
      account_role: Joi.string(),
      internal_role: Joi.string(),
      conta: Joi.object(),
      ativo: Joi.bool(),
    }),
  }),
  (req, res) => {
    crud.read(req, res, prisma.usuario);
  }
);

// Update
routes.put(
  "/usuario",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
      nome: Joi.string(),
      sobrenome: Joi.string(),
      documento: Joi.string().min(11).max(11),
      email: Joi.string(),
      senha: Joi.string(),
      telefone: Joi.string(),
      endereco: Joi.string(),
      funcao: Joi.string(),
      account_role: Joi.string(),
      internal_role: Joi.string(),
      conta: Joi.object(),
      ativo: Joi.bool(),
    }),
  }),
  (req, res) => {
    crud.update(req, res, prisma.usuario);
  }
);

// Delete
routes.delete(
  "/usuario",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  (req, res) => {
    crud.delete(req, res, prisma.usuario);
  }
);

export default routes;
