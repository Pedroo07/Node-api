import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CitiesController } from "./../controllers";
import validate from 'express-zod-safe';
import { queryValidator } from "../controllers/cities/getAll";
import { IdValidator } from "../controllers/cities/deleteById";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Hello");
});

router.post("/", (req, res) => {
  console.log(req.body);
  return res.status(StatusCodes.BAD_REQUEST).json(req.body);
});

router.post("/cities", CitiesController.createValidation, CitiesController.create);
router.get("/cities",validate({query: queryValidator}) , CitiesController.getAll);
router.get("/cities/:id", CitiesController.getByIdValidation, CitiesController.getById);
router.put("/cities/:id", CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete("/cities/:id", validate({params: IdValidator}), CitiesController.deleteById);

export { router };
