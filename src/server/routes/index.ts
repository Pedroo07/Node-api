import { Router } from "express";
import { CitiesController, PeopleController } from "./../controllers";
import validate from 'express-zod-safe';
import { queryValidator } from "../controllers/cities/getAll";
import { IdValidator } from "../controllers/cities/deleteById";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Hello");
});

router.post("/cities", CitiesController.createValidation, CitiesController.create);
router.get("/cities",validate({query: queryValidator}) , CitiesController.getAll);
router.get("/cities/:id", CitiesController.getByIdValidation, CitiesController.getById);
router.put("/cities/:id", CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete("/cities/:id", validate({params: IdValidator}), CitiesController.deleteById);

router.post("/people", PeopleController.createValidation, PeopleController.create);
router.get("/people",validate({query: queryValidator}) , PeopleController.getAll);
router.get("/people/:id", PeopleController.getByIdValidation, PeopleController.getById);
router.put("/people/:id", PeopleController.updateByIdValidation, PeopleController.updateById);
router.delete("/people/:id", validate({params: IdValidator}), PeopleController.deleteById);

export { router };
