import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CitiesController } from "./../controllers";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Ola");
});

router.post("/", (req, res) => {
  console.log(req.body);
  return res.status(StatusCodes.BAD_REQUEST).json(req.body);
});

router.post("/cities", CitiesController.create);

export { router };
