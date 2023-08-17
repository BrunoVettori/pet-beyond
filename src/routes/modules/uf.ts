import Crud from "@modules/Crud";
import prisma from "@database/Prisma";

import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi, Segments } from "celebrate";

const crud = new Crud();

const routes = Router();

// Read UF
routes.get(
  "/uf",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string(),
      uf: Joi.string(),
    }),
  }),
  (req, res) => {
    crud.read(req, res, prisma.uf);
  }
);

export default routes;
