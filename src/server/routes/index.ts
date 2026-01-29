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

router.post("/cities", CitiesController.createValidation, CitiesController.create);
router.get("/cities", CitiesController.getAllValidation, CitiesController.getAll);
router.get("/cities/:id", CitiesController.getByIdValidation, CitiesController.getById);
router.put("/cities/:id", CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete("/cities/:id", CitiesController.deleteByIdValidation, CitiesController.deleteById);

export { router };
