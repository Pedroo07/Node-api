import { Request, Response } from "express";
import z from "zod";
import { validation } from "../../shared/middlewares";

const bodyValidator = z.object({
  nome: z.string().min(3),
});
type NewCity = z.infer<typeof bodyValidator>;
export const createValidation = validation(() => ({
  body: bodyValidator
}));
export const create = (req: Request<{}, {}, NewCity>, res: Response) => {
  console.log(req.body);

  return res.status(201).json(1);
};
