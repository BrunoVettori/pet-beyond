import { Router, Request, Response, NextFunction } from "express";
import { celebrate, errors, Joi, Segments } from "celebrate";

import prisma from "@database/Prisma";
import auth from "../middlewares/auth";

import conta from "./modules/conta";
import usuario from "./modules/usuario";
import uf from "./modules/uf";

import Crud from "../modules/Crud";

import Login from "../modules/Login";

const routes = Router();
const crud = new Crud();

// Login
routes.get(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      senha: Joi.string().required(),
    }),
  }),
  (req, res) => {
    Login(req, res);
  }
);

routes.use(auth);

routes.use(conta);

routes.use(usuario);

routes.use(uf);

routes.use(errors());

export default routes;
