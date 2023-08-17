import Crud from "@modules/Crud";
import prisma from "@database/Prisma";

import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi, Segments } from "celebrate";

const crud = new Crud();

const routes = Router();

// Create
routes.post(
  "/conta",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      cnpj: Joi.string().required(),
      email: Joi.string().required(),
      telefone: Joi.string().required(),
      cor: Joi.string(),
    }),
  }),
  (req, res) => {
    crud.create(req, res, prisma.conta);
  }
);

// Read
routes.get(
  "/conta",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
      nome: Joi.string(),
      cnpj: Joi.string(),
      email: Joi.string(),
      telefone: Joi.string(),
      cor: Joi.string(),
      ativo: Joi.bool(),
    }),
  }),
  async (req, res) => {
    crud.read(req, res, prisma.conta);
  }
);

// Update
routes.put(
  "/conta",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      nome: Joi.string(),
      cnpj: Joi.string(),
      email: Joi.string(),
      telefone: Joi.string(),
      cor: Joi.string(),
      ativo: Joi.bool(),
    }),
  }),
  (req, res) => {
    crud.update(req, res, prisma.conta);
  }
);

// Delete
routes.delete(
  "/conta",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
    }),
  }),
  (req, res) => {
    crud.delete(req, res, prisma.conta);
  }
);

export default routes;
